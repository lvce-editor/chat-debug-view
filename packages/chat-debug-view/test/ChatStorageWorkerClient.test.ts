import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import * as ChatStorageWorkerClient from '../src/parts/ChatStorageWorkerClient/ChatStorageWorkerClient.ts'

test('listChatViewEvents should invoke ChatStorageWorker with the session id', async () => {
  const expected = {
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        type: 'request',
      },
    ],
    type: 'success',
  }
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => expected,
  })

  const result = await ChatStorageWorkerClient.listChatViewEvents('session-1')

  expect(result).toEqual(expected)
  expect(mockRpc.invocations).toEqual([['ChatStorage.listChatViewEvents', 'session-1']])
})

test('loadSelectedEvent should invoke ChatStorageWorker with the requested event identity', async () => {
  const expected = {
    eventId: 2,
    sessionId: 'session-1',
    type: 'response',
  }
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => expected,
  })

  const result = await ChatStorageWorkerClient.loadSelectedEvent('session-1', 2, 'response')

  expect(result).toEqual(expected)
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 2, 'response']])
})

test('registerUpdateListener should invoke ChatStorageWorker with the listener identity', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.registerUpdateListener': () => undefined,
  })

  await ChatStorageWorkerClient.registerUpdateListener('session-1', 'handleStorageWorkerUpdate', 7)

  expect(mockRpc.invocations).toEqual([['ChatStorage.registerUpdateListener', 'session-1', 'handleStorageWorkerUpdate', 7]])
})
