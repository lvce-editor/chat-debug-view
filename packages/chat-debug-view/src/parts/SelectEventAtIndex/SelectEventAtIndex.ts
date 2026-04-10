import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { filterEventsByTimelineRange } from '../FilterEventsByTimelineRange/FilterEventsByTimelineRange.ts'
import { getFilteredEvents } from '../GetFilteredEvents/GetFilteredEvents.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'

export interface SelectEventAtIndexDependencies {
  readonly loadSelectedEvent: typeof LoadSelectedEvent.loadSelectedEvent
}

export const selectEventAtIndexDependencies: SelectEventAtIndexDependencies = {
  loadSelectedEvent: LoadSelectedEvent.loadSelectedEvent,
}

export const getCurrentEvents = (state: ChatDebugViewState): readonly ChatViewEvent[] => {
  const filteredEvents = getFilteredEvents(
    state.events,
    state.filterValue,
    state.eventCategoryFilter,
    state.showInputEvents,
    state.showResponsePartEvents,
    state.showEventStreamFinishedEvents,
  )
  return filterEventsByTimelineRange(filteredEvents, state.timelineStartSeconds, state.timelineEndSeconds)
}

export const selectEventAtIndex = async (
  state: ChatDebugViewState,
  selectedEventIndex: number,
  dependencies: SelectEventAtIndexDependencies = selectEventAtIndexDependencies,
): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  const selectedEvent = currentEvents[selectedEventIndex]
  if (!selectedEvent) {
    return {
      ...state,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex,
    }
  }
  if (typeof selectedEvent.eventId !== 'number') {
    return {
      ...state,
      selectedEvent,
      selectedEventId: null,
      selectedEventIndex,
    }
  }
  const selectedEventDetails = await dependencies.loadSelectedEvent(
    state.databaseName,
    state.dataBaseVersion,
    state.eventStoreName,
    state.sessionId,
    state.sessionIdIndexName,
    selectedEvent.eventId,
    selectedEvent.type,
  )
  return {
    ...state,
    selectedEvent: selectedEventDetails ?? selectedEvent,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex,
  }
}
