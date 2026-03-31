import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { toTimeNumber } from '../ToTimeNumber/ToTimeNumber.ts'

export const getEventTime = (event: ChatViewEvent): number | undefined => {
  return toTimeNumber(event.started ?? event.startTime ?? event.startTimestamp ?? event.timestamp)
}
