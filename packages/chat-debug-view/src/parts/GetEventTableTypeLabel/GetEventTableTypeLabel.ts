import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventTypeLabel } from '../GetEventTypeLabel/GetEventTypeLabel.ts'

export const getEventTableTypeLabel = (event: ChatViewEvent): string => {
  if (event.name === 'list_files') {
    return event.name
  }
  return getEventTypeLabel(event)
}