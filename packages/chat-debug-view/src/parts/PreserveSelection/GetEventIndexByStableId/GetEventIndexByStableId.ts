import type { ChatViewEvent } from '../../ChatViewEvent/ChatViewEvent.ts'

export const getEventIndexByStableId = (events: readonly ChatViewEvent[], event: ChatViewEvent): number => {
  if (typeof event.eventId !== 'number') {
    return -1
  }
  return events.findIndex((candidate) => candidate.eventId === event.eventId)
}
