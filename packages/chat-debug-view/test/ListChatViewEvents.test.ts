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

test('listChatViewEvents should merge matching stored ai request and ai response events', async () => {
  const requestEvent = {
    body: {
      input: [{ role: 'user', text: 'hello' }],
    },
    eventId: 11,
    headers: {
      authorization: 'Bearer test',
    },
    requestId: 'request-11',
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'ai-request',
  }
  const responseEvent = {
    eventId: 12,
    requestId: 'request-11',
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.250Z',
    type: 'ai-response-success',
    value: {
      id: 'resp_11',
      output: [
        {
          content: [
            {
              text: 'done',
              type: 'output_text',
            },
          ],
        },
      ],
    },
  }
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => ({
      events: [requestEvent, responseEvent],
      type: 'success' as const,
    }),
  })

  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    events: [
      {
        body: {
          input: [{ role: 'user', text: 'hello' }],
        },
        duration: 250,
        ended: '2026-03-08T00:00:00.250Z',
        endTimestamp: '2026-03-08T00:00:00.250Z',
        eventId: 11,
        headers: {
          authorization: 'Bearer test',
        },
        requestEvent,
        requestId: 'request-11',
        requestValue: {
          input: [{ role: 'user', text: 'hello' }],
        },
        responseEvent,
        responseValue: {
          id: 'resp_11',
          output: [
            {
              content: [
                {
                  text: 'done',
                  type: 'output_text',
                },
              ],
            },
          ],
        },
        sessionId: 'session-1',
        started: '2026-03-08T00:00:00.000Z',
        startTimestamp: '2026-03-08T00:00:00.000Z',
        timestamp: '2026-03-08T00:00:00.250Z',
        type: 'ai-request-finished',
        value: {
          id: 'resp_11',
          output: [
            {
              content: [
                {
                  text: 'done',
                  type: 'output_text',
                },
              ],
            },
          ],
        },
      },
    ],
    type: 'success',
  })
  expect(mockRpc.invocations).toEqual([['ChatStorage.listChatViewEvents', 'session-1']])
})
