import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import { listChatViewEvents } from '../src/parts/ListChatViewEvents/ListChatViewEvents.ts'

test('listChatViewEvents should use chat storage worker', async () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'chat-message-added',
    },
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]
  const expected = {
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'chat-message-added',
      },
      {
        eventId: 2,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'request',
      },
    ],
    type: 'success' as const,
  }
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.getDebugEvents': () => [events[1]],
    'ChatStorage.getEvents': () => [events[0]],
  })

  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual(expected)
  expect(mockRpc.invocations).toEqual([
    ['ChatStorage.getEvents', 'session-1'],
    ['ChatStorage.getDebugEvents', 'session-1'],
  ])
})

test('listChatViewEvents should return error when chat storage worker loading fails', async () => {
  const error = new Error('worker failed')
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.getEvents': () => {
      throw error
    },
    'ChatStorage.getDebugEvents': () => [],
  })

  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    error,
    type: 'error',
  })
  expect(mockRpc.invocations).toEqual([
    ['ChatStorage.getEvents', 'session-1'],
    ['ChatStorage.getDebugEvents', 'session-1'],
  ])
})
