import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import { listChatViewEvents } from '../src/parts/ListChatViewEvents/ListChatViewEvents.ts'

test('listChatViewEvents should use chat storage worker', async () => {
  const events = [
    {
      duration: 0,
      endTime: '2026-03-08T00:00:00.000Z',
      eventId: 1,
      startTime: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const expected = {
    events,
    type: 'success' as const,
  }
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => expected,
  })

  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual(expected)
  expect(mockRpc.invocations).toEqual([['ChatStorage.listChatViewEvents', 'session-1']])
})

test('listChatViewEvents should return error when chat storage worker loading fails', async () => {
  const error = new Error('worker failed')
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => {
      throw error
    },
  })

  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    error,
    type: 'error',
  })
  expect(mockRpc.invocations).toEqual([['ChatStorage.listChatViewEvents', 'session-1']])
})
