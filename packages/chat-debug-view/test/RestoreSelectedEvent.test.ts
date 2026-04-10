import { afterEach, expect, jest, test } from '@jest/globals'
import { loadEventsDependencies } from '../src/parts/LoadEvents/LoadEvents.ts'
import { restoreSelectedEvent } from '../src/parts/LoadEvents/RestoreSelectedEvent/RestoreSelectedEvent.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('restoreSelectedEvent should load details for the selected visible event', async () => {
  const requestEvent = {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }
  const responseEvent = {
    eventId: 2,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'response',
  }
  const selectedEvent = {
    detail: 'restored',
    eventId: 2,
    type: 'response',
  }
  const loadSelectedEventSpy = jest.spyOn(loadEventsDependencies, 'loadSelectedEvent').mockResolvedValue(selectedEvent)
  const state = {
    ...createDefaultState(),
    events: [requestEvent, responseEvent],
    selectedEventId: 2,
    sessionId: 'session-1',
  }

  const result = await restoreSelectedEvent(state)

  expect(result).toEqual({
    ...state,
    selectedEvent,
    selectedEventId: 2,
    selectedEventIndex: 1,
  })
  expect(loadSelectedEventSpy).toHaveBeenCalledTimes(1)
  expect(loadSelectedEventSpy).toHaveBeenCalledWith('lvce-chat-view-sessions', 2, 'chat-view-events', 'session-1', 'sessionId', 2, 'response')
})

test('restoreSelectedEvent should clear selection when the selected event is no longer visible', async () => {
  const loadSelectedEventSpy = jest.spyOn(loadEventsDependencies, 'loadSelectedEvent')
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
        eventId: 2,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'response',
      },
    ],
    filterValue: 'request',
    selectedEvent: { eventId: 2, type: 'response' },
    selectedEventId: 2,
    selectedEventIndex: 1,
    sessionId: 'session-1',
  }

  const result = await restoreSelectedEvent(state)

  expect(result).toEqual({
    ...state,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
  })
  expect(loadSelectedEventSpy).toHaveBeenCalledTimes(0)
})