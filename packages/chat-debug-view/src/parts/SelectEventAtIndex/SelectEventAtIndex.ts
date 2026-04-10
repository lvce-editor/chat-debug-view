import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { filterEventsByTimelineRange } from '../FilterEventsByTimelineRange/FilterEventsByTimelineRange.ts'
import { getFilteredEvents } from '../GetFilteredEvents/GetFilteredEvents.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'
import { withPreparedSelectedEventPreview } from '../WithPreparedSelectedEventPreview/WithPreparedSelectedEventPreview.ts'

export interface SelectEventAtIndexDependencies {
  readonly loadSelectedEvent: typeof LoadSelectedEvent.loadSelectedEvent
}

export const selectEventAtIndexDependencies: SelectEventAtIndexDependencies = {
  loadSelectedEvent: LoadSelectedEvent.loadSelectedEvent,
}

export const getCurrentEvents = (state: ChatDebugViewState): readonly ChatViewEvent[] => {
  const eventCategoryFilter = EventCategoryFilter.getSelectedEventCategoryFilter(state.categoryFilters)
  const filteredEvents = getFilteredEvents(
    state.events,
    state.filterValue,
    eventCategoryFilter,
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
  const resolvedSelectedEvent = await withPreparedSelectedEventPreview(selectedEventDetails ?? selectedEvent)
  return {
    ...state,
    selectedEvent: resolvedSelectedEvent,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex,
  }
}
