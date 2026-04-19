import { expect, jest, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import type * as LoadSelectedEvent from '../src/parts/LoadSelectedEvent/LoadSelectedEvent.ts'
import { selectEventAtIndex } from '../src/parts/SelectEventAtIndex/SelectEventAtIndex.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

type LoadSelectedEventFn = typeof LoadSelectedEvent.loadSelectedEvent

test('selectEventAtIndex should clear the selected event when the index is out of range', async () => {
  const loadSelectedEvent = jest.fn<LoadSelectedEventFn>()
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
    ],
  }

  const result = await selectEventAtIndex(state, 3, {
    loadSelectedEvent,
  })

  expect(result).toEqual({
    ...state,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: 3,
  })
  expect(loadSelectedEvent).toHaveBeenCalledTimes(0)
})

test('selectEventAtIndex should keep the event selected when it has no numeric event id', async () => {
  const loadSelectedEvent = jest.fn<LoadSelectedEventFn>()
  const invalidEvent = {
    eventId: 'missing-id',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  } as unknown as ChatViewEvent
  const state = {
    ...createDefaultState(),
    events: [invalidEvent],
  }

  const result = await selectEventAtIndex(state, 0, {
    loadSelectedEvent,
  })

  expect(result).toEqual({
    ...state,
    selectedEvent: invalidEvent,
    selectedEventId: null,
    selectedEventIndex: 0,
  })
  expect(loadSelectedEvent).toHaveBeenCalledTimes(0)
})

test('selectEventAtIndex should preserve merged ai request and response details', async () => {
  const loadSelectedEvent = jest.fn<LoadSelectedEventFn>().mockResolvedValue({
    body: {
      input: ['1+1'],
    },
    eventId: 1,
    requestId: 'request-1',
    type: 'ai-request',
  })
  const mergedEvent = {
    ended: '2026-04-19T12:00:00.250Z',
    eventId: 1,
    requestEvent: {
      eventId: 1,
      requestId: 'request-1',
      type: 'ai-request',
    },
    responseEvent: {
      eventId: 2,
      requestId: 'request-1',
      type: 'ai-response-success',
      value: {
        id: 'resp_1',
      },
    },
    sessionId: 'session-1',
    started: '2026-04-19T12:00:00.000Z',
    type: 'ai-request',
  }
  const state = {
    ...createDefaultState(),
    events: [mergedEvent],
    sessionId: 'session-1',
  }

  const result = await selectEventAtIndex(state, 0, {
    loadSelectedEvent,
  })

  expect(result.selectedEvent).toEqual(
    expect.objectContaining({
      requestEvent: {
        body: {
          input: ['1+1'],
        },
        eventId: 1,
        requestId: 'request-1',
        type: 'ai-request',
      },
      responseEvent: {
        eventId: 2,
        requestId: 'request-1',
        type: 'ai-response-success',
        value: {
          id: 'resp_1',
        },
      },
    }),
  )
})
