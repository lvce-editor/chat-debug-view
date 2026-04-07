import { expect, test } from '@jest/globals'
import { getPreviewEvent } from '../src/parts/GetPreviewEvent/GetPreviewEvent.ts'

test('getPreviewEvent should return only the message text for chat-message-updated events', () => {
  const event = {
    eventId: 156,
    inProgress: false,
    messageId: 'abc',
    sessionId: 'def',
    text: 'Done - preview text only',
    time: '11:17 AM',
    timestamp: '2026-04-07T09:17:45.786Z',
    toolCalls: [
      {
        arguments: '{}',
        id: 'call_123',
        name: 'getWorkspaceUri',
        result: '/test/folder',
        status: 'success',
      },
    ],
    type: 'chat-message-updated',
  }

  const result = getPreviewEvent(event)

  expect(result).toBe('Done - preview text only')
})
