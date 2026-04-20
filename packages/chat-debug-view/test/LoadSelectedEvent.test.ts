import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import { loadSelectedEvent } from '../src/parts/LoadSelectedEvent/LoadSelectedEvent.ts'

test('loadSelectedEvent should resolve a required chat event from combined worker results', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.getDebugEvents': () => [
      {
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'request',
      },
    ],
    'ChatStorage.getEvents': () => [
      {
        message: { id: 'message-1', role: 'assistant', text: 'hello', time: '2026-03-08T00:00:00.000Z' },
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'chat-message-added',
      },
    ],
  })

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'chat-message-added')

  expect(result).toEqual({
    eventId: 1,
    message: { id: 'message-1', role: 'assistant', text: 'hello', time: '2026-03-08T00:00:00.000Z' },
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'chat-message-added',
  })
  expect(mockRpc.invocations).toEqual([
    ['ChatStorage.getEvents', 'session-1'],
    ['ChatStorage.getDebugEvents', 'session-1'],
  ])
})

test('loadSelectedEvent should collapse matching debug event pairs from combined worker results', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.getDebugEvents': () => [
      {
        requestId: 'request-1',
        sessionId: 'session-1',
        started: '2026-03-08T00:00:00.000Z',
        timestamp: '2026-03-08T00:00:00.000Z',
        toolName: 'search',
        type: 'tool-execution-started',
      },
      {
        ended: '2026-03-08T00:00:01.000Z',
        requestId: 'request-1',
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        toolName: 'search',
        type: 'tool-execution-finished',
      },
    ],
    'ChatStorage.getEvents': () => [],
  })

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'tool-execution')

  expect(result).toEqual({
    ended: '2026-03-08T00:00:01.000Z',
    eventId: 1,
    requestId: 'request-1',
    sessionId: 'session-1',
    started: '2026-03-08T00:00:00.000Z',
    timestamp: '2026-03-08T00:00:01.000Z',
    toolName: 'search',
    type: 'tool-execution',
  })
  expect(mockRpc.invocations).toEqual([
    ['ChatStorage.getEvents', 'session-1'],
    ['ChatStorage.getDebugEvents', 'session-1'],
  ])
})

test('loadSelectedEvent should return null when the combined worker results do not contain the requested event', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.getDebugEvents': () => [],
    'ChatStorage.getEvents': () => [],
  })

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toBeNull()
  expect(mockRpc.invocations).toEqual([
    ['ChatStorage.getEvents', 'session-1'],
    ['ChatStorage.getDebugEvents', 'session-1'],
  ])
})
