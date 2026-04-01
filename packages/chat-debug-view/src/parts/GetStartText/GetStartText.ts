import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getTimestampText } from '../GetTimestampText/GetTimestampText.ts'

export const getStartText = (event: ChatViewEvent): string => {
  return getTimestampText(event.started ?? event.startTime ?? event.startTimestamp ?? event.timestamp)
}
