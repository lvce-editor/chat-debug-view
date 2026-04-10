import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'

export const getEmptyMessage = (
  eventCount: number,
  hasFilterValue: boolean,
  useNoToolCallEventsMessage: boolean,
  noFilteredEventsMessage: string,
): string => {
  if (eventCount === 0 && hasFilterValue) {
    return useNoToolCallEventsMessage ? ChatDebugStrings.noToolCallEvents() : noFilteredEventsMessage
  }
  return ChatDebugStrings.noEventsFound()
}
