import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getStatusText } from '../GetStatusText/GetStatusText.ts'
import { isHeadersRecord } from '../IsHeadersRecord/IsHeadersRecord.ts'

export const getStatusCodeValue = (selectedEvent: ChatViewEvent | null): unknown => {
  if (!selectedEvent) {
    return undefined
  }
  const endValue = isHeadersRecord(selectedEvent.endValue) ? selectedEvent.endValue : undefined
  if (endValue?.statusCode !== undefined) {
    return endValue.statusCode
  }
  if (selectedEvent.statusCode !== undefined) {
    return selectedEvent.statusCode
  }
  if (selectedEvent.type === 'ai-request' || selectedEvent.type === 'ai-response') {
    return getStatusText(selectedEvent)
  }
  return undefined
}
