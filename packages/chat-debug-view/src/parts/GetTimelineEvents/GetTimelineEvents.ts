import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getFilteredEvents } from '../GetFilteredEvents/GetFilteredEvents.ts'

export const getTimelineEvents = (state: ChatDebugViewState): readonly ChatViewEvent[] => {
  const { eventCategoryFilter, events, filterValue, showEventStreamFinishedEvents, showInputEvents, showResponsePartEvents } = state

  return getFilteredEvents(events, filterValue, eventCategoryFilter, showInputEvents, showResponsePartEvents, showEventStreamFinishedEvents)
}
