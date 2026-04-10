import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import { getStateWithTimelineInfo } from '../src/parts/GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { handleClickRefresh } from '../src/parts/HandleClickRefresh/HandleClickRefresh.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleClickRefresh should delegate to refresh', async () => {
  const events = [{ eventId: 1, type: 'request' }]
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => ({
      events,
      type: 'success' as const,
    }),
  })
  const state = {
    ...createDefaultState(),
    sessionId: 'session-1',
  }
  const expectedState = getStateWithTimelineInfo({
    ...state,
    errorMessage: '',
    events,
    initial: false,
  })

  const result = await handleClickRefresh(state)

  expect(result).toEqual(expectedState)
  expect(mockRpc.invocations).toEqual([['ChatStorage.listChatViewEvents', 'session-1']])
})
