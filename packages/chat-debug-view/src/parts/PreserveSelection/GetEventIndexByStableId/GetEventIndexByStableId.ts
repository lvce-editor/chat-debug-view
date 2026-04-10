import type { ChatViewEvent } from '../../ChatViewEvent/ChatViewEvent.ts'

export const getEventIndexByStableId = (events: readonly ChatViewEvent[], event: ChatViewEvent): number => {
  return events.findIndex((candidate) => candidate.eventId === event.eventId)
}
