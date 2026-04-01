import { expect, test } from '@jest/globals'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { filterEventsBySessionId } from '../src/parts/FilterEventsBySessionId/FilterEventsBySessionId.ts'
import { getAllEvents } from '../src/parts/GetAllEvents/GetAllEvents.ts'
import { getEventsBySessionId } from '../src/parts/GetEventsBySessionId/GetEventsBySessionId.ts'
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
    getAll: async () => {
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
      getAll: async () => {
        throw new Error('should not call getAll when index exists')
      },
      index: () => ({
        getAll: async (sessionId: string) => {
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
        contains: (name: string) => name === 'sessionId',
      },
    } as any,
    'session-1',
    'sessionId',
  )

  expect(result).toEqual([
    {
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    },
  ])
})

test('getEventsBySessionId should fall back to getAll when the index is missing', async () => {
  const result = await getEventsBySessionId(
    {
      getAll: async () => {
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
      index: () => {
        throw new Error('should not call index when it is missing')
      },
      indexNames: {
        contains: () => false,
      },
    } as any,
    'session-1',
    'sessionId',
  )

  expect(result).toEqual([
    {
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:01.000Z',
      type: 'response',
    },
  ])
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