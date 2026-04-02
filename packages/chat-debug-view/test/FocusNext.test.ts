import { afterEach, expect, jest, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import { focusNext, focusNextDependencies } from '../src/parts/FocusNext/FocusNext.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('focusNext should select the first row when nothing is selected', async () => {
  jest.spyOn(focusNextDependencies, 'loadSelectedEvent').mockResolvedValue({
    detail: 'row-1',
    eventId: 1,
    type: 'request',
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
    sessionId: 'session-1',
  }

  const result = await focusNext(state)

  expect(result.selectedEventIndex).toBe(0)
  expect(result.selectedDetailTab).toBe('preview')
  expect(result.selectedEvent).toEqual({
    detail: 'row-1',
    eventId: 1,
    type: 'request',
  })
})

test('focusNext should stop at the last row', async () => {
  const loadSelectedEventSpy = jest.spyOn(focusNextDependencies, 'loadSelectedEvent').mockResolvedValue({
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
    selectedEventIndex: 1,
    sessionId: 'session-1',
  }

  const result = await focusNext(state)

  expect(result.selectedEventIndex).toBe(1)
  expect(loadSelectedEventSpy).toHaveBeenCalledTimes(1)
})
