import type { ChatViewEvent } from '../../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../../EventCategoryFilter/EventCategoryFilter.ts'
import { filterEventsByTimelineRange } from '../../FilterEventsByTimelineRange/FilterEventsByTimelineRange.ts'
import { getFilteredEvents } from '../../GetFilteredEvents/GetFilteredEvents.ts'

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
