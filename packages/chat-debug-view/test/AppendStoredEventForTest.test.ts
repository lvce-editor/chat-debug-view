import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import * as AppendStoredEventForTest from '../src/parts/AppendStoredEventForTest/AppendStoredEventForTest.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('appendStoredEventForTest should append the event through the chat storage worker client', async () => {
  const state = createDefaultState()
  const event = {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.appendEvent': () => undefined,
  })

  const result = await AppendStoredEventForTest.appendStoredEventForTest(state, event)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ChatStorage.appendEvent', event]])
})
