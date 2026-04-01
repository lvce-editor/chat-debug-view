import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getFilteredEvents } from '../GetFilteredEvents/GetFilteredEvents.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const getTimelineEvents = (state: ChatDebugViewState): readonly ChatViewEvent[] => {
  return getFilteredEvents(
    state.events,
    state.filterValue,
    state.eventCategoryFilter,
    state.showInputEvents,
    state.showResponsePartEvents,
    state.showEventStreamFinishedEvents,
  )
}
