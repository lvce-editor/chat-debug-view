import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { isChatMessageAddedEvent } from '../IsChatMessageAddedEvent/IsChatMessageAddedEvent.ts'
import { isChatMessageUpdatedEvent } from '../IsChatMessageUpdatedEvent/IsChatMessageUpdatedEvent.ts'

export const getPreviewMessageText = (event: ChatViewEvent): string | undefined => {
  if (isChatMessageUpdatedEvent(event) && typeof event.text === 'string') {
    return event.text
  }
  if (!isChatMessageAddedEvent(event)) {
    return undefined
  }
  const { message } = event
  if (!message || typeof message !== 'object') {
    return undefined
  }
  if (!Object.hasOwn(message, 'text')) {
    return undefined
  }
  const { text } = message as { readonly text?: unknown }
  if (typeof text !== 'string') {
    return undefined
  }
  return text
}
