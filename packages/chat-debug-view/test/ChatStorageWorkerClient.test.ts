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

test('getEvents should invoke ChatStorageWorker with the session id', async () => {
  const expected = [{ sessionId: 'session-1', timestamp: '2026-03-08T00:00:00.000Z', type: 'chat-message-added' }]
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.getEvents': () => expected,
  })

  const result = await ChatStorageWorkerClient.getEvents('session-1')

  expect(result).toEqual(expected)
  expect(mockRpc.invocations).toEqual([['ChatStorage.getEvents', 'session-1']])
})

test('getDebugEvents should invoke ChatStorageWorker with the session id', async () => {
  const expected = [{ sessionId: 'session-1', timestamp: '2026-03-08T00:00:01.000Z', type: 'request' }]
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.getDebugEvents': () => expected,
  })

  const result = await ChatStorageWorkerClient.getDebugEvents('session-1')

  expect(result).toEqual(expected)
  expect(mockRpc.invocations).toEqual([['ChatStorage.getDebugEvents', 'session-1']])
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
