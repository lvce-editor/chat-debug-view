import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const isChatMessageAddedEvent = (event: ChatViewEvent): boolean => {
  return event.type === 'chat-message-added'
}
