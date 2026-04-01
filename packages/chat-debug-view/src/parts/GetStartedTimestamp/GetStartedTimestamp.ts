import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getTimestamp } from '../GetTimestamp/GetTimestamp.ts'

export const getStartedTimestamp = (event: ChatViewEvent): string | number | undefined => {
  return getTimestamp(event.started) ?? getTimestamp(event.startTime) ?? getTimestamp(event.startTimestamp) ?? getTimestamp(event.timestamp)
}
