import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { formatHttpStatusCode } from '../FormatHttpStatusCode/FormatHttpStatusCode.ts'
import { isNonEmptyString } from '../IsNonEmptyString/IsNonEmptyString.ts'
import { getStatusCodeValue } from '../GetStatusCodeValue/GetStatusCodeValue.ts'

export const getGeneralEntries = (selectedEvent: ChatViewEvent | null): readonly (readonly [string, unknown])[] => {
  if (!selectedEvent) {
    return []
  }
  const entries: (readonly [string, unknown])[] = []
  if (isNonEmptyString(selectedEvent.url)) {
    entries.push([ChatDebugStrings.requestUrl(), selectedEvent.url])
  }
  if (isNonEmptyString(selectedEvent.method)) {
    entries.push([ChatDebugStrings.requestMethod(), selectedEvent.method])
  }
  const statusCode = getStatusCodeValue(selectedEvent)
  if (statusCode !== undefined && statusCode !== '') {
    entries.push([ChatDebugStrings.statusCode(), formatHttpStatusCode(statusCode)])
  }
  return entries
}