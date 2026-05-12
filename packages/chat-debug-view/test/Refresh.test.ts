import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import { getFailedToLoadMessage } from '../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { getInvalidUriMessage } from '../src/parts/GetInvalidUriMessage/GetInvalidUriMessage.ts'
import { getSessionNotFoundMessage } from '../src/parts/GetSessionNotFoundMessage/GetSessionNotFoundMessage.ts'
import { getStateWithTimelineInfo } from '../src/parts/GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { ParseChatDebugUriErrorCode } from '../src/parts/ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'
import { refresh } from '../src/parts/Refresh/Refresh.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('refresh should return invalid-uri state when session id cannot be resolved', async () => {
  const state = {
    ...createDefaultState(),
    initial: true,
    uri: 'invalid://session-1',
  }

  const result = await refresh(state)

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...state,
      errorMessage: getInvalidUriMessage('invalid://session-1', ParseChatDebugUriErrorCode.InvalidUriFormat),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventIndex: null,
      sessionId: '',
    }),
  )
})

test('refresh should return session-not-found state when latest events are empty', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => ({
      events: [],
      type: 'success' as const,
    }),
  })
  const state = {
    ...createDefaultState(),
    sessionId: 'session-1',
    uri: 'chat-debug://session-1',
  }

  const result = await refresh(state)

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...state,
      errorMessage: getSessionNotFoundMessage('session-1'),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventIndex: null,
    }),
  )
  expect(mockRpc.invocations).toEqual([['ChatStorage.listChatViewEvents', 'session-1']])
})

test('refresh should update events with latest data from chat storage worker', async () => {
  const events = [{ eventId: 1, time: '1ms', type: 'request' }]
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => ({
      events,
      type: 'success' as const,
    }),
  })
  const state = {
    ...createDefaultState(),
    sessionId: 'session-1',
    uri: 'chat-debug://session-1',
  }

  const result = await refresh(state)

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...state,
      errorMessage: '',
      events,
      initial: false,
      selectedEvent: null,
      selectedEventIndex: null,
    }),
  )
  expect(mockRpc.invocations).toEqual([['ChatStorage.listChatViewEvents', 'session-1']])
})

test('refresh should return failed-to-load state when listing events returns an error', async () => {
  const error = new Error('failed to load events')
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => {
      throw error
    },
  })
  const state = {
    ...createDefaultState(),
    sessionId: 'session-1',
    uri: 'chat-debug://session-1',
  }

  const result = await refresh(state)

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...state,
      errorMessage: getFailedToLoadMessage('session-1', error),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventIndex: null,
    }),
  )
  expect(mockRpc.invocations).toEqual([['ChatStorage.listChatViewEvents', 'session-1']])
})
