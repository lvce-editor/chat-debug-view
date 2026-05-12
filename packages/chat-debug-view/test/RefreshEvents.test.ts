import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import { getStateWithTimelineInfo } from '../src/parts/GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { refreshEvents } from '../src/parts/LoadEvents/RefreshEvents/RefreshEvents.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('refreshEvents should prefer the current state session id over the uri session id', async () => {
  const events = [{ eventId: 1, type: 'request' }]
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => ({
      events,
      type: 'success' as const,
    }),
  })
  const state = {
    ...createDefaultState(),
    sessionId: 'session-from-state',
    uri: 'chat-debug://session-from-uri',
  }

  const result = await refreshEvents(state)

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...state,
      errorMessage: '',
      events,
      initial: false,
      sessionId: 'session-from-state',
    }),
  )
  expect(mockRpc.invocations).toEqual([['ChatStorage.listChatViewEvents', 'session-from-state']])
})
