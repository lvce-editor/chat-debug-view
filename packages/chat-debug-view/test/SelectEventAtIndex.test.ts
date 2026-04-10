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
