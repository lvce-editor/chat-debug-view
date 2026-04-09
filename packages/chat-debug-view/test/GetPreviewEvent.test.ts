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

test('getPreviewEvent should return only the nested message text for chat-message-added events', () => {
  const event = {
    eventId: 3,
    message: {
      id: '89016d05-7342-4eb0-b200-8d631e1cea49',
      role: 'user',
      text: 'what tools do you have access to?',
      time: '02:05 PM',
    },
    sessionId: 'ff68dd2f-6053-453f-95a9-de785f33f67c',
    timestamp: '2026-04-09T12:05:40.910Z',
    type: 'chat-message-added',
  }

  const result = getPreviewEvent(event)

  expect(result).toBe('what tools do you have access to?')
})
