import type { ChatViewEvent } from '../../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../../EventCategoryFilter/EventCategoryFilter.ts'
import { filterEventsByTimelineRange } from '../../FilterEventsByTimelineRange/FilterEventsByTimelineRange.ts'
import { getFilteredEvents } from '../../GetFilteredEvents/GetFilteredEvents.ts'
import { sortEventsByTableColumn } from '../../SortEventsByTableColumn/SortEventsByTableColumn.ts'

export const getCurrentEvents = (state: ChatDebugViewState): readonly ChatViewEvent[] => {
  const {
    categoryFilters,
    events,
    filterValue,
    showEventStreamFinishedEvents,
    showInputEvents,
    showResponsePartEvents,
    sortColumn,
    sortDescending,
    timelineEndSeconds,
    timelineStartSeconds,
  } = state
  const eventCategoryFilters = EventCategoryFilter.getSelectedEventCategoryFilters(categoryFilters)
  const filteredEvents = getFilteredEvents(
    events,
    filterValue,
    eventCategoryFilters,
    showInputEvents,
    showResponsePartEvents,
    showEventStreamFinishedEvents,
  )
  const timelineEvents = filterEventsByTimelineRange(filteredEvents, timelineStartSeconds, timelineEndSeconds)
  return sortEventsByTableColumn(timelineEvents, sortColumn, sortDescending)
}
