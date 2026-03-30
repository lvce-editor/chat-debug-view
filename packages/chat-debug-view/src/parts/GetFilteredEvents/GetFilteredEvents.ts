import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { parseFilterValue } from '../ParseFilterValue/ParseFilterValue.ts'

const toolEventTypePrefix = 'tool-execution-'

const isToolEvent = (event: ChatViewEvent): boolean => {
  return event.type.startsWith(toolEventTypePrefix)
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
  showInputEvents: boolean,
  showResponsePartEvents: boolean,
  showEventStreamFinishedEvents: boolean,
): readonly ChatViewEvent[] => {
  const visibleEvents = getVisibleEvents(events, showInputEvents, showResponsePartEvents, showEventStreamFinishedEvents)
  const { filterText, toolsOnly } = parseFilterValue(filterValue)
  const filteredBySyntax = toolsOnly ? visibleEvents.filter(isToolEvent) : visibleEvents
  if (!filterText) {
    return filteredBySyntax
  }
  return filteredBySyntax.filter((event) => JSON.stringify(event).toLowerCase().includes(filterText))
}
