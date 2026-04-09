import { afterEach, expect, jest, test } from '@jest/globals'
import { getFailedToLoadMessage } from '../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { getInvalidUriMessage } from '../src/parts/GetInvalidUriMessage/GetInvalidUriMessage.ts'
import { getSessionNotFoundMessage } from '../src/parts/GetSessionNotFoundMessage/GetSessionNotFoundMessage.ts'
import { ParseChatDebugUriErrorCode } from '../src/parts/ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'
import { refresh, refreshDependencies } from '../src/parts/Refresh/Refresh.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('refresh should return invalid-uri state when session id cannot be resolved', async () => {
  const listChatViewEventsSpy = jest.spyOn(refreshDependencies, 'listChatViewEvents')
  const state = {
    ...createDefaultState(),
    initial: true,
    uri: 'invalid://session-1',
  }

  const result = await refresh(state)

  expect(result).toEqual({
    ...state,
    errorMessage: getInvalidUriMessage('invalid://session-1', ParseChatDebugUriErrorCode.InvalidUriFormat),
    events: [],
    initial: false,
    selectedEvent: null,
    selectedEventIndex: null,
    sessionId: '',
  })
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(0)
})

test('refresh should return session-not-found state when latest events are empty', async () => {
  const listChatViewEventsSpy = jest.spyOn(refreshDependencies, 'listChatViewEvents').mockResolvedValue({
    events: [],
    type: 'success',
  })
  const state = {
    ...createDefaultState(),
    sessionId: 'session-1',
    uri: 'chat-debug://session-1',
  }

  const result = await refresh(state)

  expect(result).toEqual({
    ...state,
    errorMessage: getSessionNotFoundMessage('session-1'),
    events: [],
    initial: false,
    selectedEvent: null,
    selectedEventIndex: null,
  })
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
})

test('refresh should update events with latest data from chat storage worker', async () => {
  const events = [{ eventId: 1, time: 1, type: 'request' }]
  const listChatViewEventsSpy = jest.spyOn(refreshDependencies, 'listChatViewEvents').mockResolvedValue({
    events,
    type: 'success',
  })
  const state = {
    ...createDefaultState(),
    sessionId: 'session-1',
    uri: 'chat-debug://session-1',
  }

  const result = await refresh(state)

  expect(result).toEqual({
    ...state,
    errorMessage: '',
    events,
    initial: false,
    selectedEvent: null,
    selectedEventIndex: null,
  })
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
  expect(listChatViewEventsSpy).toHaveBeenCalledWith('session-1', 'lvce-chat-view-sessions', 2, 'chat-view-events', 'sessionId')
})

test('refresh should return failed-to-load state when listing events returns an error', async () => {
  const error = new Error('failed to load events')
  const listChatViewEventsSpy = jest.spyOn(refreshDependencies, 'listChatViewEvents').mockResolvedValue({
    error,
    type: 'error',
  })
  const state = {
    ...createDefaultState(),
    sessionId: 'session-1',
    uri: 'chat-debug://session-1',
  }

  const result = await refresh(state)

  expect(result).toEqual({
    ...state,
    errorMessage: getFailedToLoadMessage('session-1', error),
    events: [],
    initial: false,
    selectedEvent: null,
    selectedEventIndex: null,
  })
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
})
