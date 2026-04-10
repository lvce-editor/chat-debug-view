import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import { getCurrentEvents } from '../GetCurrentEvents/GetCurrentEvents.ts'
import { getEventIndexByStableId } from '../GetEventIndexByStableId/GetEventIndexByStableId.ts'

export const getPreservedSelectedEventIndex = (oldState: ChatDebugViewState, newState: ChatDebugViewState): number | null => {
  const { selectedEventIndex } = oldState
  if (selectedEventIndex === null) {
    return null
  }
  const oldFilteredEvents = getCurrentEvents(oldState)
  const selectedEvent = oldFilteredEvents[selectedEventIndex]
  if (!selectedEvent) {
    return null
  }
  const newFilteredEvents = getCurrentEvents(newState)
  const newIndex = getEventIndexByStableId(newFilteredEvents, selectedEvent)
  if (newIndex === -1) {
    return null
  }
  return newIndex
}
