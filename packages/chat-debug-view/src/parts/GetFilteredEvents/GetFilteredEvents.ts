import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { collapseToolExecutionEvents } from '../CollapseToolExecutionEvents/CollapseToolExecutionEvents.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { getVisibleEvents } from '../GetVisibleEvents/GetVisibleEvents.ts'
import { matchesEventCategoryFilter } from '../MatchesEventCategoryFilter/MatchesEventCategoryFilter.ts'
import { parseFilterValue } from '../ParseFilterValue/ParseFilterValue.ts'

export const getFilteredEvents = (
  events: readonly ChatViewEvent[],
  filterValue: string,
  eventCategoryFilter: string,
  showInputEvents: boolean,
  showResponsePartEvents: boolean,
  showEventStreamFinishedEvents: boolean,
): readonly ChatViewEvent[] => {
  const visibleEvents = getVisibleEvents(events, showInputEvents, showResponsePartEvents, showEventStreamFinishedEvents)
  const collapsedEvents = collapseToolExecutionEvents(visibleEvents)
  const parsedFilter = parseFilterValue(filterValue)
  const activeEventCategoryFilter =
    parsedFilter.eventCategoryFilter === EventCategoryFilter.All ? eventCategoryFilter : parsedFilter.eventCategoryFilter
  const filteredByCategory = collapsedEvents.filter((event) => matchesEventCategoryFilter(event, activeEventCategoryFilter))
  const { filterText } = parsedFilter
  if (!filterText) {
    return filteredByCategory
  }
  return filteredByCategory.filter((event) => JSON.stringify(event).toLowerCase().includes(filterText))
}
