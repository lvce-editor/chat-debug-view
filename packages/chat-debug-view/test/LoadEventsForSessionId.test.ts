import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import { getFailedToLoadMessage } from '../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { getSessionNotFoundMessage } from '../src/parts/GetSessionNotFoundMessage/GetSessionNotFoundMessage.ts'
import { getStateWithTimelineInfo } from '../src/parts/GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { loadEventsForSessionId } from '../src/parts/LoadEvents/LoadEventsForSessionId/LoadEventsForSessionId.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('loadEventsForSessionId should return failed-to-load state when listing events returns an error', async () => {
  const error = new Error('failed to load events')
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => {
      throw error
    },
  })
  const state = createDefaultState()

  const result = await loadEventsForSessionId(state, 'session-1')

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...state,
      errorMessage: getFailedToLoadMessage('session-1', error),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
      sessionId: 'session-1',
    }),
  )
  expect(mockRpc.invocations).toEqual([['ChatStorage.listChatViewEvents', 'session-1']])
})

test('loadEventsForSessionId should return session-not-found state when no events are found', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => ({
      events: [],
      type: 'success' as const,
    }),
  })
  const state = createDefaultState()

  const result = await loadEventsForSessionId(state, 'session-1')

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...state,
      errorMessage: getSessionNotFoundMessage('session-1'),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
      sessionId: 'session-1',
    }),
  )
  expect(mockRpc.invocations).toEqual([['ChatStorage.listChatViewEvents', 'session-1']])
})
