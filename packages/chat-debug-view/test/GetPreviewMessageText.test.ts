import { expect, test } from '@jest/globals'
import * as GetPreviewMessageText from '../src/parts/GetPreviewMessageText/GetPreviewMessageText.ts'

test('getPreviewMessageText should return the top-level text for chat-message-updated events', () => {
  const result = GetPreviewMessageText.getPreviewMessageText({
    eventId: 1,
    text: 'updated text',
    type: 'chat-message-updated',
  })

  expect(result).toBe('updated text')
})

test('getPreviewMessageText should return the nested message text for chat-message-added events', () => {
  const result = GetPreviewMessageText.getPreviewMessageText({
    eventId: 1,
    message: {
      text: 'added text',
    },
    type: 'chat-message-added',
  })

  expect(result).toBe('added text')
})

test('getPreviewMessageText should return the first message content text for chat-message-added events', () => {
  const result = GetPreviewMessageText.getPreviewMessageText({
    eventId: 1,
    message: {
      content: [
        {
          text: 'added content text',
          type: 'text',
        },
      ],
    },
    type: 'chat-message-added',
  })

  expect(result).toBe('added content text')
})

test('getPreviewMessageText should return the first message content text for message events', () => {
  const result = GetPreviewMessageText.getPreviewMessageText({
    eventId: 1,
    message: {
      content: [
        {
          text: 'first message',
          type: 'text',
        },
      ],
      role: 'user',
    },
    requestId: 'request-1',
    type: 'message',
  })

  expect(result).toBe('first message')
})

test('getPreviewMessageText should return undefined when the nested message text is missing', () => {
  const result = GetPreviewMessageText.getPreviewMessageText({
    eventId: 1,
    message: {
      value: 'missing text field',
    },
    type: 'chat-message-added',
  })

  expect(result).toBeUndefined()
})

test('getPreviewMessageText should return undefined for unrelated events', () => {
  const result = GetPreviewMessageText.getPreviewMessageText({
    eventId: 1,
    text: 'ignored',
    type: 'request',
  })

  expect(result).toBeUndefined()
})

test('getPreviewMessageText should return the first response output text for sse-response-completed events', () => {
  const result = GetPreviewMessageText.getPreviewMessageText({
    eventId: 1,
    type: 'sse-response-completed',
    value: {
      response: {
        output: [
          {
            content: [
              {
                text: 'completed response preview',
                type: 'output_text',
              },
            ],
          },
        ],
      },
      type: 'response.completed',
    },
  })

  expect(result).toBe('completed response preview')
})

test('getPreviewMessageText should return the direct response content text for sse-response-completed events', () => {
  const result = GetPreviewMessageText.getPreviewMessageText({
    eventId: 1,
    type: 'sse-response-completed',
    value: {
      response: {
        output: [
          {
            content: {
              text: 'direct content text',
            },
          },
        ],
      },
      type: 'response.completed',
    },
  })

  expect(result).toBe('direct content text')
})
