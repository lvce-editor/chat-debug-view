import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import { getCurrentEvents } from '../GetCurrentEvents/GetCurrentEvents.ts'
import { getEventIndexByStableId } from '../GetEventIndexByStableId/GetEventIndexByStableId.ts'

export const getSelectedEventIndex = (state: ChatDebugViewState): number | null => {
  const { selectedEventIndex } = state
  if (selectedEventIndex === null) {
    return null
  }
  const filteredEvents = getCurrentEvents(state)
  const selectedEvent = filteredEvents[selectedEventIndex]
  if (!selectedEvent) {
    return null
  }
  const newIndex = getEventIndexByStableId(filteredEvents, selectedEvent)
  if (newIndex === -1) {
    return null
  }
  return newIndex
}
