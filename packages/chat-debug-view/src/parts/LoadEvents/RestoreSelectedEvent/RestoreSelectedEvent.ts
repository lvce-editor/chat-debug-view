import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import { getCurrentEvents } from '../GetCurrentEvents/GetCurrentEvents.ts'
import { loadEventsDependencies } from '../LoadEventsDependencies/LoadEventsDependencies.ts'
import { withPreparedSelectedEventPreview } from '../../WithPreparedSelectedEventPreview/WithPreparedSelectedEventPreview.ts'

export const restoreSelectedEvent = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  if (state.selectedEventId === null) {
    return {
      ...state,
      selectedEvent: null,
      selectedEventIndex: null,
    }
  }
  const currentEvents = getCurrentEvents(state)
  const selectedEventIndex = currentEvents.findIndex((event) => event.eventId === state.selectedEventId)
  if (selectedEventIndex === -1) {
    return {
      ...state,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
    }
  }
  const selectedEvent = currentEvents[selectedEventIndex]
  if (!selectedEvent || typeof selectedEvent.eventId !== 'number') {
    return {
      ...state,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
    }
  }
  const selectedEventDetails = await loadEventsDependencies.loadSelectedEvent(
    state.databaseName,
    state.dataBaseVersion,
    state.eventStoreName,
    state.sessionId,
    state.sessionIdIndexName,
    selectedEvent.eventId,
    selectedEvent.type,
  )
  const resolvedSelectedEvent = selectedEventDetails ? await withPreparedSelectedEventPreview(selectedEventDetails) : null
  return {
    ...state,
    selectedEvent: resolvedSelectedEvent,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex,
  }
}
