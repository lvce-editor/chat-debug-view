import { afterEach, expect, jest, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import { focusLast, focusLastDependencies } from '../src/parts/FocusLast/FocusLast.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('focusLast should keep the same state when there are no visible events', async () => {
  const loadSelectedEventSpy = jest.spyOn(focusLastDependencies, 'loadSelectedEvent')
  const state = createDefaultState()

  const result = await focusLast(state)

  expect(result).toBe(state)
  expect(loadSelectedEventSpy).toHaveBeenCalledTimes(0)
})

test('focusLast should select the final event when another row is selected', async () => {
  jest.spyOn(focusLastDependencies, 'loadSelectedEvent').mockResolvedValue({
    detail: 'row-2',
    eventId: 2,
    type: 'response',
  } as ChatViewEvent)
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
        eventId: 2,
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'response',
      },
    ],
    selectedDetailTab: 'preview',
    selectedEventIndex: 0,
    sessionId: 'session-1',
  }

  const result = await focusLast(state)

  expect(result.selectedEventIndex).toBe(1)
  expect(result.selectedDetailTab).toBe('preview')
  expect(result.selectedEvent).toEqual({
    detail: 'row-2',
    eventId: 2,
    type: 'response',
  })
})
