import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { collapseToolExecutionEvents } from '../CollapseToolExecutionEvents/CollapseToolExecutionEvents.ts'
import { getVisibleEvents } from '../GetVisibleEvents/GetVisibleEvents.ts'
import { matchesEventCategoryFilter } from '../MatchesEventCategoryFilter/MatchesEventCategoryFilter.ts'

export const getFilteredEvents = (
  events: readonly ChatViewEvent[],
  filterValue: string,
  eventCategoryFilters: readonly string[],
  showInputEvents: boolean,
  showResponsePartEvents: boolean,
  showEventStreamFinishedEvents: boolean,
): readonly ChatViewEvent[] => {
  const visibleEvents = getVisibleEvents(events, showInputEvents, showResponsePartEvents, showEventStreamFinishedEvents)
  const collapsedEvents = collapseToolExecutionEvents(visibleEvents)
  const filteredByCategory = collapsedEvents.filter((event) => matchesEventCategoryFilter(event, eventCategoryFilters))
  const filterText = filterValue.trim().toLowerCase()
  if (!filterText) {
    return filteredByCategory
  }
  return filteredByCategory.filter((event) => JSON.stringify(event).toLowerCase().includes(filterText))
}
