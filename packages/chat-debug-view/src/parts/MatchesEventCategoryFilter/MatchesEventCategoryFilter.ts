import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'

const matchesEventType = (eventType: string, filterEventType: string): boolean => {
  return filterEventType === '*' || eventType === filterEventType || eventType.startsWith(`${filterEventType}-`)
}

const matchesSingleEventCategoryFilter = (event: ChatViewEvent, categoryFilter: CategoryFilter): boolean => {
  return categoryFilter.eventTypes.some((eventType) => matchesEventType(event.type, eventType))
}

export const matchesEventCategoryFilter = (event: ChatViewEvent, categoryFilters: readonly CategoryFilter[]): boolean => {
  if (categoryFilters.length === 0) {
    return true
  }
  return categoryFilters.some((categoryFilter) => matchesSingleEventCategoryFilter(event, categoryFilter))
}
