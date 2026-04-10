import { expect, test } from '@jest/globals'
import * as IsChatMessageAddedEvent from '../src/parts/IsChatMessageAddedEvent/IsChatMessageAddedEvent.ts'

test('isChatMessageAddedEvent should return true for chat-message-added events', () => {
  const result = IsChatMessageAddedEvent.isChatMessageAddedEvent({
    eventId: 1,
    type: 'chat-message-added',
  })

  expect(result).toBe(true)
})

test('isChatMessageAddedEvent should return false for other events', () => {
  const result = IsChatMessageAddedEvent.isChatMessageAddedEvent({
    eventId: 1,
    type: 'request',
  })

  expect(result).toBe(false)
})
