import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getFilteredEvents } from '../GetFilteredEvents/GetFilteredEvents.ts'
import { filterEventsByTimelineRange } from '../GetTimelineInfo/GetTimelineInfo.ts'

const getCurrentEvents = (state: ChatDebugViewState): readonly ChatViewEvent[] => {
  const filteredEvents = getFilteredEvents(
    state.events,
    state.filterValue,
    state.eventCategoryFilter,
    state.showInputEvents,
    state.showResponsePartEvents,
    state.showEventStreamFinishedEvents,
  )
  return filterEventsByTimelineRange(filteredEvents, state.timelineStartSeconds, state.timelineEndSeconds)
}

const getEventIndexByStableId = (events: readonly ChatViewEvent[], event: ChatViewEvent): number => {
  return events.findIndex((candidate) => candidate.eventId === event.eventId)
}

export const getSelectedEventIndex = (state: ChatDebugViewState): number | null => {
  const { selectedEventIndex } = state
  if (selectedEventIndex === null) {
    return null
  }
  const filteredEvents = getCurrentEvents(state)
  const selectedEvent = filteredEvents[selectedEventIndex]
  if (!selectedEvent) {
    return null
  }
  const newIndex = getEventIndexByStableId(filteredEvents, selectedEvent)
  if (newIndex === -1) {
    return null
  }
  return newIndex
}

const getPreservedSelectedEventIndex = (oldState: ChatDebugViewState, newState: ChatDebugViewState): number | null => {
  const { selectedEventIndex } = oldState
  if (selectedEventIndex === null) {
    return null
  }
  const oldFilteredEvents = getCurrentEvents(oldState)
  const selectedEvent = oldFilteredEvents[selectedEventIndex]
  if (!selectedEvent) {
    return null
  }
  const newFilteredEvents = getCurrentEvents(newState)
  const newIndex = getEventIndexByStableId(newFilteredEvents, selectedEvent)
  if (newIndex === -1) {
    return null
  }
  return newIndex
}

export const withPreservedSelection = (state: ChatDebugViewState, nextState: ChatDebugViewState): ChatDebugViewState => {
  const selectedEventIndex = getPreservedSelectedEventIndex(state, nextState)
  return {
    ...nextState,
    selectedEvent: selectedEventIndex === null ? null : state.selectedEvent,
    selectedEventId: selectedEventIndex === null ? null : state.selectedEventId,
    selectedEventIndex,
  }
}
