import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventSubType } from '../GetEventSubType/GetEventSubType.ts'

export const getEventTableTypeLabel = (event: ChatViewEvent): string => {
  return getEventSubType(event)
}
