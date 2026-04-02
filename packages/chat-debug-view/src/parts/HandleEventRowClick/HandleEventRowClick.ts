import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getFilteredEvents } from '../GetFilteredEvents/GetFilteredEvents.ts'
import { filterEventsByTimelineRange } from '../GetTimelineInfo/GetTimelineInfo.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'

export const handleEventRowClickDependencies = {
  loadSelectedEvent: LoadSelectedEvent.loadSelectedEvent,
}

const isPrimaryButton = (button: number): boolean => {
  return button === 0
}

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

const parseSelectedEventIndex = (value: string): number | null => {
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed < 0) {
    return null
  }
  return parsed
}

export const handleEventRowClick = async (state: ChatDebugViewState, value: string, button: number): Promise<ChatDebugViewState> => {
  if (!isPrimaryButton(button)) {
    return state
  }
  const selectedEventIndex = parseSelectedEventIndex(value)
  if (selectedEventIndex === null) {
    return state
  }
  const currentEvents = getCurrentEvents(state)
  const selectedEvent = currentEvents[selectedEventIndex]
  if (!selectedEvent) {
    return {
      ...state,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex,
    }
  }
  if (typeof selectedEvent.eventId !== 'number') {
    return {
      ...state,
      selectedEvent,
      selectedEventId: null,
      selectedEventIndex,
    }
  }
  const selectedEventDetails = await handleEventRowClickDependencies.loadSelectedEvent(
    state.databaseName,
    state.dataBaseVersion,
    state.eventStoreName,
    state.sessionId,
    state.sessionIdIndexName,
    selectedEvent.eventId,
    selectedEvent.type,
  )
  return {
    ...state,
    selectedEvent: selectedEventDetails ?? selectedEvent,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex,
  }
}
