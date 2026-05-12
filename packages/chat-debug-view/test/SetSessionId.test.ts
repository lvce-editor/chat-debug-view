import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import { getFailedToLoadMessage } from '../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { rpcId as handleStorageWorkerUpdateRpcId } from '../src/parts/HandleStorageWorkerUpdate/HandleStorageWorkerUpdate.ts'
import { setSessionId } from '../src/parts/SetSessionId/SetSessionId.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('setSessionId should load events for the given session id and clear selection state', async () => {
  const events = [{ eventId: 1, time: '1ms', type: 'request' }]
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => ({
      events,
      type: 'success' as const,
    }),
    'ChatStorage.registerUpdateListener': () => undefined,
  })
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
  expect(mockRpc.invocations).toEqual([
    ['ChatStorage.listChatViewEvents', 'session-1'],
    ['ChatStorage.registerUpdateListener', 'session-1', handleStorageWorkerUpdateRpcId, 0],
  ])
})

test('setSessionId should return failed-to-load state when listing events returns an error', async () => {
  const error = new Error('failed to load events')
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => {
      throw error
    },
    'ChatStorage.registerUpdateListener': () => undefined,
  })
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
  expect(mockRpc.invocations).toEqual([
    ['ChatStorage.listChatViewEvents', 'session-1'],
    ['ChatStorage.registerUpdateListener', 'session-1', handleStorageWorkerUpdateRpcId, 0],
  ])
})

test('setSessionId should keep an empty successful result as an empty events state', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => ({
      events: [],
      type: 'success' as const,
    }),
    'ChatStorage.registerUpdateListener': () => undefined,
  })
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
  expect(mockRpc.invocations).toEqual([
    ['ChatStorage.listChatViewEvents', 'session-2'],
    ['ChatStorage.registerUpdateListener', 'session-2', handleStorageWorkerUpdateRpcId, 0],
  ])
})
