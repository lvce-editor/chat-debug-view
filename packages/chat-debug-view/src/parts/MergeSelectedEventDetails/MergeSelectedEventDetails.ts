import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const mergeSelectedEventDetails = (selectedEvent: ChatViewEvent, selectedEventDetails: ChatViewEvent | null): ChatViewEvent => {
  if (!selectedEventDetails) {
    return selectedEvent
  }
  const { requestEvent, responseEvent } = selectedEvent as {
    readonly requestEvent?: unknown
    readonly responseEvent?: unknown
  }
  if (!requestEvent || !responseEvent || typeof requestEvent !== 'object' || typeof responseEvent !== 'object') {
    return selectedEventDetails
  }
  const selectedEventDetailsType = selectedEventDetails.type
  const resolvedResponseEvent =
    selectedEventDetailsType === 'response' || selectedEventDetailsType === 'ai-response-success' ? selectedEventDetails : responseEvent
  return {
    ...selectedEventDetails,
    ...selectedEvent,
    requestEvent: {
      ...(requestEvent),
      ...selectedEventDetails,
    },
    responseEvent: resolvedResponseEvent,
  }
}
