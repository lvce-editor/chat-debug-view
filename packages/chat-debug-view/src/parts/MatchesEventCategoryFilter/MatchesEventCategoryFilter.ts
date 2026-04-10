import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { isNetworkEvent } from '../IsNetworkEvent/IsNetworkEvent.ts'
import { isStreamEvent } from '../IsStreamEvent/IsStreamEvent.ts'
import { isToolEvent } from '../IsToolEvent/IsToolEvent.ts'
import { isUiEvent } from '../IsUiEvent/IsUiEvent.ts'

const matchesSingleEventCategoryFilter = (event: ChatViewEvent, eventCategoryFilter: string): boolean => {
  switch (eventCategoryFilter) {
    case EventCategoryFilter.Network:
      return isNetworkEvent(event)
    case EventCategoryFilter.Stream:
      return isStreamEvent(event)
    case EventCategoryFilter.Tools:
      return isToolEvent(event)
    case EventCategoryFilter.Ui:
      return isUiEvent(event)
    default:
      return true
  }
}

export const matchesEventCategoryFilter = (event: ChatViewEvent, eventCategoryFilters: readonly string[]): boolean => {
  if (eventCategoryFilters.length === 0 || eventCategoryFilters.includes(EventCategoryFilter.All)) {
    return true
  }
  return eventCategoryFilters.some((eventCategoryFilter) => matchesSingleEventCategoryFilter(event, eventCategoryFilter))
}
