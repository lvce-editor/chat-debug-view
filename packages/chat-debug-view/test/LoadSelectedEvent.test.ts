import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import { loadSelectedEvent } from '../src/parts/LoadSelectedEvent/LoadSelectedEvent.ts'

test('loadSelectedEvent should use chat storage worker', async () => {
  const event = {
    eventId: 1,
    sessionId: 'session-1',
    type: 'request',
  }
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => event,
  })

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toEqual(event)
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 1, 'request']])
})

test('loadSelectedEvent should return the selected event details from the worker', async () => {
  const event = {
    eventId: 1,
    sessionId: 'session-1',
    type: 'request',
  }
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => event,
  })

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toEqual(event)
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 1, 'request']])
})

test('loadSelectedEvent should return null when the worker has no details', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => null,
  })

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toBeNull()
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 1, 'request']])
})
