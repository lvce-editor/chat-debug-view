import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { getFilteredEvents } from '../GetFilteredEvents/GetFilteredEvents.ts'

export const getTimelineEvents = (state: ChatDebugViewState): readonly ChatViewEvent[] => {
  const { events, filterValue, showEventStreamFinishedEvents, showInputEvents, showResponsePartEvents } = state
  const eventCategoryFilter = EventCategoryFilter.getSelectedEventCategoryFilter(state.categoryFilters)

  return getFilteredEvents(events, filterValue, eventCategoryFilter, showInputEvents, showResponsePartEvents, showEventStreamFinishedEvents)
}
