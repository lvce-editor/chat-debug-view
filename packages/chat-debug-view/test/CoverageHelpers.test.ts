import { expect, test } from '@jest/globals'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { filterEventsBySessionId } from '../src/parts/FilterEventsBySessionId/FilterEventsBySessionId.ts'
import { getEventDetailsBySessionIdAndEventId } from '../src/parts/GetEventDetailsBySessionIdAndEventId/GetEventDetailsBySessionIdAndEventId.ts'
import { getAllEvents } from '../src/parts/GetAllEvents/GetAllEvents.ts'
import { getEventsBySessionId } from '../src/parts/GetEventsBySessionId/GetEventsBySessionId.ts'
import { getLightweightEvent } from '../src/parts/GetLightweightEvent/GetLightweightEvent.ts'
import { getTimelineFilterDescription } from '../src/parts/GetTimelineFilterDescription/GetTimelineFilterDescription.ts'
import { handleSashPointerDown } from '../src/parts/HandleSashPointerDown/HandleSashPointerDown.ts'
import { handleSashPointerUp } from '../src/parts/HandleSashPointerUp/HandleSashPointerUp.ts'
import { hasErrorStatus } from '../src/parts/HasErrorStatus/HasErrorStatus.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getEventCategoryFilterLabel should return labels for all known filters and fallback to all', () => {
  expect(EventCategoryFilter.getEventCategoryFilterLabel(EventCategoryFilter.Network)).toBe('Network')
  expect(EventCategoryFilter.getEventCategoryFilterLabel(EventCategoryFilter.Stream)).toBe('Stream')
  expect(EventCategoryFilter.getEventCategoryFilterLabel(EventCategoryFilter.Tools)).toBe('Tools')
  expect(EventCategoryFilter.getEventCategoryFilterLabel(EventCategoryFilter.Ui)).toBe('UI')
  expect(EventCategoryFilter.getEventCategoryFilterLabel('unknown')).toBe('All')
})

test('filterEventsBySessionId should return only matching events', () => {
  const result = filterEventsBySessionId(
    [
      {
        sessionId: 'a',
        timestamp: '2026-01-01T00:00:00.000Z',
        type: 'request',
      },
      {
        sessionId: 'b',
        timestamp: '2026-01-01T00:00:01.000Z',
        type: 'response',
      },
      {
        sessionId: 'a',
        timestamp: '2026-01-01T00:00:02.000Z',
        type: 'error',
      },
    ],
    'a',
  )

  expect(result).toEqual([
    {
      sessionId: 'a',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'a',
      timestamp: '2026-01-01T00:00:02.000Z',
      type: 'error',
    },
  ])
})

test('getAllEvents should return all items from the store', async () => {
  const result = await getAllEvents({
    getAll: async (): Promise<readonly { readonly sessionId: string; readonly timestamp: string; readonly type: string }[]> => {
      return [
        {
          sessionId: 'session-1',
          timestamp: '2026-01-01T00:00:00.000Z',
          type: 'request',
        },
      ]
    },
  } as any)

  expect(result).toEqual([
    {
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    },
  ])
})

test('getEventsBySessionId should use the index when it exists', async () => {
  const result = await getEventsBySessionId(
    {
      getAll: async (): Promise<never> => {
        throw new Error('should not call getAll when index exists')
      },
      index: (): {
        readonly getAll: (sessionId: string) => Promise<readonly { readonly sessionId: string; readonly timestamp: string; readonly type: string }[]>
      } => ({
        getAll: async (sessionId: string): Promise<readonly { readonly sessionId: string; readonly timestamp: string; readonly type: string }[]> => {
          return [
            {
              sessionId,
              timestamp: '2026-01-01T00:00:00.000Z',
              type: 'request',
            },
            {
              sessionId: 'other',
              timestamp: '2026-01-01T00:00:01.000Z',
              type: 'response',
            },
          ]
        },
      }),
      indexNames: {
        contains: (name: string): boolean => name === 'sessionId',
      },
    } as any,
    'session-1',
    'sessionId',
  )

  expect(result).toEqual([
    {
      duration: 0,
      endTime: '2026-01-01T00:00:00.000Z',
      eventId: 1,
      startTime: '2026-01-01T00:00:00.000Z',
      type: 'request',
    },
  ])
})

test('getEventsBySessionId should fall back to getAll when the index is missing', async () => {
  const result = await getEventsBySessionId(
    {
      getAll: async (): Promise<readonly { readonly sessionId: string; readonly timestamp: string; readonly type: string }[]> => {
        return [
          {
            sessionId: 'other',
            timestamp: '2026-01-01T00:00:00.000Z',
            type: 'request',
          },
          {
            sessionId: 'session-1',
            timestamp: '2026-01-01T00:00:01.000Z',
            type: 'response',
          },
        ]
      },
      index: (): never => {
        throw new Error('should not call index when it is missing')
      },
      indexNames: {
        contains: (): boolean => false,
      },
    } as any,
    'session-1',
    'sessionId',
  )

  expect(result).toEqual([
    {
      duration: 0,
      endTime: '2026-01-01T00:00:01.000Z',
      eventId: 1,
      startTime: '2026-01-01T00:00:01.000Z',
      type: 'response',
    },
  ])
})

test('getEventsBySessionId should preserve raw event ids after collapsing tool execution events', async () => {
  const result = await getEventsBySessionId(
    {
      getAll: async (): Promise<never> => {
        throw new Error('should not call getAll when index exists')
      },
      index: (): {
        readonly getAll: (sessionId: string) => Promise<readonly ChatViewEvent[]>
      } => ({
        getAll: async (sessionId: string): Promise<readonly ChatViewEvent[]> => {
          return [
            {
              sessionId,
              timestamp: '2026-01-01T00:00:00.000Z',
              toolName: 'read_file',
              type: 'tool-execution-started',
            },
            {
              sessionId,
              timestamp: '2026-01-01T00:00:01.000Z',
              toolName: 'read_file',
              type: 'tool-execution-finished',
            },
            {
              sessionId,
              timestamp: '2026-01-01T00:00:02.000Z',
              type: 'response',
            },
          ]
        },
      }),
      indexNames: {
        contains: (name: string): boolean => name === 'sessionId',
      },
    } as any,
    'session-1',
    'sessionId',
  )

  expect(result).toEqual([
    {
      duration: 1000,
      endTime: '2026-01-01T00:00:01.000Z',
      eventId: 1,
      startTime: '2026-01-01T00:00:00.000Z',
      type: 'tool-execution',
    },
    {
      duration: 0,
      endTime: '2026-01-01T00:00:02.000Z',
      eventId: 3,
      startTime: '2026-01-01T00:00:02.000Z',
      type: 'response',
    },
  ])
})

test('getLightweightEvent should keep only summary fields', () => {
  const result = getLightweightEvent(
    {
      durationMs: 7,
      error: 'ignored',
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    },
    5,
  )

  expect(result).toEqual({
    duration: 7,
    endTime: '2026-01-01T00:00:00.000Z',
    eventId: 5,
    startTime: '2026-01-01T00:00:00.000Z',
    type: 'request',
  })
})

test('getEventDetailsBySessionIdAndEventId should load a single event by key from the session index', async () => {
  const result = await getEventDetailsBySessionIdAndEventId(
    {
      get: async (
        key: string,
      ): Promise<readonly [string, string] | { readonly payload: string; readonly sessionId: string; readonly type: string }> => {
        if (key === 'key-2') {
          return {
            payload: 'match',
            sessionId: 'session-1',
            type: 'request',
          }
        }
        return ['unexpected', key]
      },
      getAll: async (): Promise<never> => {
        throw new Error('should not load all events when index exists')
      },
      index: (): {
        readonly getAllKeys: (sessionId: string, count: number) => Promise<readonly string[]>
      } => ({
        getAllKeys: async (sessionId: string, count: number): Promise<readonly string[]> => {
          expect(sessionId).toBe('session-1')
          expect(count).toBe(2)
          return ['key-1', 'key-2']
        },
      }),
      indexNames: {
        contains: (name: string): boolean => name === 'sessionId',
      },
    } as any,
    'session-1',
    'sessionId',
    2,
    'request',
  )

  expect(result).toEqual({
    eventId: 2,
    payload: 'match',
    sessionId: 'session-1',
    type: 'request',
  })
})

test('getTimelineFilterDescription should describe explicit start and end', () => {
  expect(getTimelineFilterDescription(' 5 ', ' 9 ')).toBe('5s-9s')
})

test('getTimelineFilterDescription should describe only start', () => {
  expect(getTimelineFilterDescription(' 5 ', '  ')).toBe('from 5s')
})

test('getTimelineFilterDescription should describe only end', () => {
  expect(getTimelineFilterDescription(' ', ' 9 ')).toBe('to 9s')
})

test('getTimelineFilterDescription should return empty string when there is no range', () => {
  expect(getTimelineFilterDescription(' ', ' ')).toBe('')
})

test('hasErrorStatus should return true for error events', () => {
  expect(
    hasErrorStatus({
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'error',
    }),
  ).toBe(true)
})

test('hasErrorStatus should return true when success or ok is false', () => {
  expect(
    hasErrorStatus({
      sessionId: 'session-1',
      success: false,
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)

  expect(
    hasErrorStatus({
      ok: false,
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)
})

test('hasErrorStatus should return true for numeric and string status codes >= 400', () => {
  expect(
    hasErrorStatus({
      sessionId: 'session-1',
      status: 500,
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)

  expect(
    hasErrorStatus({
      sessionId: 'session-1',
      status: '404',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)
})

test('hasErrorStatus should return true when an error field is present', () => {
  expect(
    hasErrorStatus({
      error: 'failed',
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)

  expect(
    hasErrorStatus({
      errorMessage: 'failed',
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)

  expect(
    hasErrorStatus({
      exception: 'failed',
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(true)
})

test('hasErrorStatus should return false for non-error events', () => {
  expect(
    hasErrorStatus({
      sessionId: 'session-1',
      status: 204,
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    }),
  ).toBe(false)
})

test('handleSashPointerDown and handleSashPointerUp should return the same state object', () => {
  const state = createDefaultState()

  expect(handleSashPointerDown(state, 10, 20)).toBe(state)
  expect(handleSashPointerUp(state, 10, 20)).toBe(state)
})
