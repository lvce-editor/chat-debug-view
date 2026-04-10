import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const isChatMessageUpdatedEvent = (event: ChatViewEvent): boolean => {
  return event.type === 'chat-message-updated'
}
