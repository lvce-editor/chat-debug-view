import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const isUiEvent = (event: ChatViewEvent): boolean => {
  return event.type.startsWith('handle-') && event.type !== 'handle-response'
}
