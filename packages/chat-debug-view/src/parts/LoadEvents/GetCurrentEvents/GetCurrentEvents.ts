import type { ChatViewEvent } from '../../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../../EventCategoryFilter/EventCategoryFilter.ts'
import { filterEventsByTimelineRange } from '../../FilterEventsByTimelineRange/FilterEventsByTimelineRange.ts'
import { getFilteredEvents } from '../../GetFilteredEvents/GetFilteredEvents.ts'
import { sortEventsByTableColumn } from '../../SortEventsByTableColumn/SortEventsByTableColumn.ts'

export const getCurrentEvents = (state: ChatDebugViewState): readonly ChatViewEvent[] => {
  const eventCategoryFilters = EventCategoryFilter.getSelectedEventCategoryFilters(state.categoryFilters)
  const filteredEvents = getFilteredEvents(
    state.events,
    state.filterValue,
    eventCategoryFilters,
    state.showInputEvents,
    state.showResponsePartEvents,
    state.showEventStreamFinishedEvents,
  )
  const timelineEvents = filterEventsByTimelineRange(filteredEvents, state.timelineStartSeconds, state.timelineEndSeconds)
  return sortEventsByTableColumn(timelineEvents, state.sortColumn, state.sortDescending)
}
