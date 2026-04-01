import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getStartTime = (event: ChatViewEvent): number | string | undefined => {
  return event.started ?? event.startTime ?? event.timestamp
}
