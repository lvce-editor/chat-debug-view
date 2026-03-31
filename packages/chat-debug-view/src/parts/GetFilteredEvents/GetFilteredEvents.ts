import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { parseFilterValue } from '../ParseFilterValue/ParseFilterValue.ts'

const toolEventTypePrefix = 'tool-execution-'

const isToolEvent = (event: ChatViewEvent): boolean => {
  return event.type.startsWith(toolEventTypePrefix)
}

const isNetworkEvent = (event: ChatViewEvent): boolean => {
  const normalizedType = event.type.toLowerCase()
  return (
    normalizedType === 'request' ||
    normalizedType === 'response' ||
    normalizedType === 'handle-response' ||
    normalizedType.includes('fetch') ||
    normalizedType.includes('xhr')
  )
}

const isUiEvent = (event: ChatViewEvent): boolean => {
  return event.type.startsWith('handle-') && event.type !== 'handle-response'
}

const isStreamEvent = (event: ChatViewEvent): boolean => {
  return event.type === 'sse-response-part' || event.type === 'event-stream-finished'
}

const matchesEventCategoryFilter = (event: ChatViewEvent, eventCategoryFilter: string): boolean => {
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

const getVisibleEvents = (
  events: readonly ChatViewEvent[],
  showInputEvents: boolean,
  showResponsePartEvents: boolean,
  showEventStreamFinishedEvents: boolean,
): readonly ChatViewEvent[] => {
  return events.filter((event) => {
    if (!showInputEvents && (event.type === 'handle-input' || event.type === 'handle-submit')) {
      return false
    }
    if (!showResponsePartEvents && event.type === 'sse-response-part') {
      return false
    }
    if (!showEventStreamFinishedEvents && event.type === 'event-stream-finished') {
      return false
    }
    // hide session creation events by default — not useful in the debug view
    if (event.type === 'chat-session-created') {
      return false
    }
    return true
  })
}

export const getFilteredEvents = (
  events: readonly ChatViewEvent[],
  filterValue: string,
  eventCategoryFilter: string,
  showInputEvents: boolean,
  showResponsePartEvents: boolean,
  showEventStreamFinishedEvents: boolean,
): readonly ChatViewEvent[] => {
  const visibleEvents = getVisibleEvents(events, showInputEvents, showResponsePartEvents, showEventStreamFinishedEvents)
  const parsedFilter = parseFilterValue(filterValue)
  const activeEventCategoryFilter =
    parsedFilter.eventCategoryFilter === EventCategoryFilter.All ? eventCategoryFilter : parsedFilter.eventCategoryFilter
  const filteredByCategory = visibleEvents.filter((event) => matchesEventCategoryFilter(event, activeEventCategoryFilter))
  const { filterText } = parsedFilter
  if (!filterText) {
    return filteredByCategory
  }
  return filteredByCategory.filter((event) => JSON.stringify(event).toLowerCase().includes(filterText))
}
