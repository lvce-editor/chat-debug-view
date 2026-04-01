import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getEndTime = (event: ChatViewEvent): number | string | undefined => {
  return event.ended ?? event.endTime ?? event.timestamp
}
