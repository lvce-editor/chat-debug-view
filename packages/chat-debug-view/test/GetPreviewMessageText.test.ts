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
