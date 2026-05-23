import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getResponseMap = (events: readonly ChatViewEvent[]): Record<string, ChatViewEvent> => {
  const seen: Record<string, ChatViewEvent> = Object.create(null)
  for (const event of events) {
    if (event.type === 'tool-call-finished' && 'requestId' in event && typeof event.requestId === 'string') {
      seen[event.requestId] = event
    }
    if (event.type === 'ai-response' && 'requestId' in event && typeof event.requestId === 'string') {
      seen[event.requestId] = event
    }
  }
  return seen
}
