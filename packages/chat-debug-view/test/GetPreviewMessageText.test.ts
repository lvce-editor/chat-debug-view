import { expect, test } from '@jest/globals'
import * as GetPreviewMessageText from '../src/parts/GetPreviewMessageText/GetPreviewMessageText.ts'

test('getPreviewMessageText should return the top-level text for chat-message-updated events', () => {
  const result = GetPreviewMessageText.getPreviewMessageText({
    eventId: 1,
    subType: 'chat-message-updated',
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
    subType: 'chat-message-added',
    type: 'chat-message-added',
  })

  expect(result).toBe('added text')
})

test('getPreviewMessageText should return undefined when the nested message text is missing', () => {
  const result = GetPreviewMessageText.getPreviewMessageText({
    eventId: 1,
    message: {
      value: 'missing text field',
    },
    subType: 'chat-message-added',
    type: 'chat-message-added',
  })

  expect(result).toBeUndefined()
})

test('getPreviewMessageText should return undefined for unrelated events', () => {
  const result = GetPreviewMessageText.getPreviewMessageText({
    eventId: 1,
    subType: 'request',
    text: 'ignored',
    type: 'request',
  })

  expect(result).toBeUndefined()
})

test('getPreviewMessageText should return the first response output text for sse-response-completed events', () => {
  const result = GetPreviewMessageText.getPreviewMessageText({
    eventId: 1,
    subType: 'sse-response-completed',
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
    subType: 'sse-response-completed',
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

test('getPreviewMessageText should return response text from ai-request endValue before request body content', () => {
  const result = GetPreviewMessageText.getPreviewMessageText({
    body: {
      input: [
        {
          content: [
            {
              text: 'request body text',
              type: 'input_text',
            },
          ],
          role: 'user',
        },
      ],
    },
    endValue: {
      value: {
        output: [
          {
            content: [
              {
                text: 'response preview text',
                type: 'output_text',
              },
            ],
          },
        ],
      },
    },
    eventId: 1,
    subType: 'ai-request',
    type: 'ai-request',
  })

  expect(result).toBe('response preview text')
})
