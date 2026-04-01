import type { ChatViewEvent } from '../../ChatViewEvent/ChatViewEvent.ts'
import { getTimestamp } from '../GetTimestamp/GetTimestamp.ts'

export const getEndedTimestamp = (event: ChatViewEvent): string | number | undefined => {
  return getTimestamp(event.ended) ?? getTimestamp(event.endTime) ?? getTimestamp(event.endTimestamp) ?? getTimestamp(event.timestamp)
}
