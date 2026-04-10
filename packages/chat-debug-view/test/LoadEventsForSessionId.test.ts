import { afterEach, expect, jest, test } from '@jest/globals'
import { getFailedToLoadMessage } from '../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { getSessionNotFoundMessage } from '../src/parts/GetSessionNotFoundMessage/GetSessionNotFoundMessage.ts'
import { loadEventsDependencies } from '../src/parts/LoadEvents/LoadEvents.ts'
import { loadEventsForSessionId } from '../src/parts/LoadEvents/LoadEventsForSessionId/LoadEventsForSessionId.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('loadEventsForSessionId should return failed-to-load state when listing events returns an error', async () => {
  const error = new Error('failed to load events')
  const listChatViewEventsSpy = jest.spyOn(loadEventsDependencies, 'listChatViewEvents').mockResolvedValue({
    error,
    type: 'error',
  })
  const state = createDefaultState()

  const result = await loadEventsForSessionId(state, 'session-1')

  expect(result).toEqual({
    ...state,
    errorMessage: getFailedToLoadMessage('session-1', error),
    events: [],
    initial: false,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
    sessionId: 'session-1',
  })
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
})

test('loadEventsForSessionId should return session-not-found state when no events are found', async () => {
  const listChatViewEventsSpy = jest.spyOn(loadEventsDependencies, 'listChatViewEvents').mockResolvedValue({
    events: [],
    type: 'success',
  })
  const state = createDefaultState()

  const result = await loadEventsForSessionId(state, 'session-1')

  expect(result).toEqual({
    ...state,
    errorMessage: getSessionNotFoundMessage('session-1'),
    events: [],
    initial: false,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
    sessionId: 'session-1',
  })
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
})
