import { expect, test } from '@jest/globals'
import * as IsChatMessageUpdatedEvent from '../src/parts/IsChatMessageUpdatedEvent/IsChatMessageUpdatedEvent.ts'

test('isChatMessageUpdatedEvent should return true for chat-message-updated events', () => {
  const result = IsChatMessageUpdatedEvent.isChatMessageUpdatedEvent({
    eventId: 1,
    type: 'chat-message-updated',
  })

  expect(result).toBe(true)
})

test('isChatMessageUpdatedEvent should return false for other events', () => {
  const result = IsChatMessageUpdatedEvent.isChatMessageUpdatedEvent({
    eventId: 1,
    type: 'request',
  })

  expect(result).toBe(false)
})
