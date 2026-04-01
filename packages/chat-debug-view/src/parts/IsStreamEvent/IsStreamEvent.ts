import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const isStreamEvent = (event: ChatViewEvent): boolean => {
  return event.type === 'sse-response-part' || event.type === 'event-stream-finished'
}
