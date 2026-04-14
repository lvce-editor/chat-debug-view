import { afterEach, expect, jest, test } from '@jest/globals'
import { getFailedToLoadMessage } from '../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { rpcId as handleStorageWorkerUpdateRpcId } from '../src/parts/HandleStorageWorkerUpdate/HandleStorageWorkerUpdate.ts'
import { setSessionId, setSessionIdDependencies } from '../src/parts/SetSessionId/SetSessionId.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('setSessionId should load events for the given session id and clear selection state', async () => {
  const events = [{ eventId: 1, time: 1, type: 'request' }]
  const listChatViewEventsSpy = jest.spyOn(setSessionIdDependencies, 'listChatViewEvents').mockResolvedValue({
    events,
    type: 'success',
  })
  const registerUpdateListenerSpy = jest.spyOn(setSessionIdDependencies, 'registerUpdateListener').mockResolvedValue(undefined)
  const state = {
    ...createDefaultState(),
    errorMessage: 'previous error',
    initial: true,
    selectedEvent: { eventId: 1, type: 'request' },
    selectedEventId: 1,
    selectedEventIndex: 0,
  }

  const result = await setSessionId(state, 'session-1')

  expect(result).toEqual({
    ...state,
    errorMessage: '',
    events,
    initial: false,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
    sessionId: 'session-1',
  })
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
  expect(listChatViewEventsSpy).toHaveBeenCalledWith('session-1', 'lvce-chat-view-sessions', 2, 'chat-view-events', 'sessionId')
  expect(registerUpdateListenerSpy).toHaveBeenCalledTimes(1)
  expect(registerUpdateListenerSpy).toHaveBeenCalledWith('session-1', handleStorageWorkerUpdateRpcId, 0)
})

test('setSessionId should return failed-to-load state when listing events returns an error', async () => {
  const error = new Error('failed to load events')
  const listChatViewEventsSpy = jest.spyOn(setSessionIdDependencies, 'listChatViewEvents').mockResolvedValue({
    error,
    type: 'error',
  })
  const registerUpdateListenerSpy = jest.spyOn(setSessionIdDependencies, 'registerUpdateListener').mockResolvedValue(undefined)
  const state = {
    ...createDefaultState(),
    initial: true,
    selectedEvent: { eventId: 2, type: 'response' },
    selectedEventId: 2,
    selectedEventIndex: 1,
  }

  const result = await setSessionId(state, 'session-1')

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
  expect(registerUpdateListenerSpy).toHaveBeenCalledTimes(1)
  expect(registerUpdateListenerSpy).toHaveBeenCalledWith('session-1', handleStorageWorkerUpdateRpcId, 0)
})

test('setSessionId should keep an empty successful result as an empty events state', async () => {
  const listChatViewEventsSpy = jest.spyOn(setSessionIdDependencies, 'listChatViewEvents').mockResolvedValue({
    events: [],
    type: 'success',
  })
  const registerUpdateListenerSpy = jest.spyOn(setSessionIdDependencies, 'registerUpdateListener').mockResolvedValue(undefined)
  const state = {
    ...createDefaultState(),
    errorMessage: 'previous error',
    initial: true,
    selectedEvent: { eventId: 3, type: 'tool' },
    selectedEventId: 3,
    selectedEventIndex: 2,
  }

  const result = await setSessionId(state, 'session-2')

  expect(result).toEqual({
    ...state,
    errorMessage: '',
    events: [],
    initial: false,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
    sessionId: 'session-2',
  })
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
  expect(registerUpdateListenerSpy).toHaveBeenCalledTimes(1)
  expect(registerUpdateListenerSpy).toHaveBeenCalledWith('session-2', handleStorageWorkerUpdateRpcId, 0)
})
