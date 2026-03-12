import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const filterEventsBySessionId = (events: readonly ChatViewEvent[], sessionId: string): readonly ChatViewEvent[] => {
  return events.filter((event) => event.sessionId === sessionId)
}
