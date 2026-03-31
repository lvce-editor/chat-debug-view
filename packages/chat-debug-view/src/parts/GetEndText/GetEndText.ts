import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getTimestampText } from '../GetTimestampText/GetTimestampText.ts'

export const getEndText = (event: ChatViewEvent): string => {
  return getTimestampText(event.ended ?? event.endTime ?? event.endTimestamp ?? event.timestamp)
}