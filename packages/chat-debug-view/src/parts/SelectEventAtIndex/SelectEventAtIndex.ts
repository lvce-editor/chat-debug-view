import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
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
  const { events, filterValue, showInputEvents, showResponsePartEvents, showEventStreamFinishedEvents, timelineStartSeconds, timelineEndSeconds } = state
  const eventCategoryFilters = EventCategoryFilter.getSelectedEventCategoryFilters(state.categoryFilters)
  const filteredEvents = getFilteredEvents(
    events,
    filterValue,
    eventCategoryFilters,
    showInputEvents,
    showResponsePartEvents,
    showEventStreamFinishedEvents,
  )
  return filterEventsByTimelineRange(filteredEvents, timelineStartSeconds, timelineEndSeconds)
}

export const selectEventAtIndex = async (
  state: ChatDebugViewState,
  selectedEventIndex: number,
  dependencies: SelectEventAtIndexDependencies = selectEventAtIndexDependencies,
): Promise<ChatDebugViewState> => {
  const selectedDetailTab = DetailTab.getSelectedDetailTab(state.detailTabs)
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
    detailTabs: DetailTab.createDetailTabs(selectedDetailTab, resolvedSelectedEvent),
    selectedEvent: resolvedSelectedEvent,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex,
  }
}
