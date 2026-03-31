import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import * as GetBoolean from '../GetBoolean/GetBoolean.ts'
import { getFilteredEvents } from '../GetFilteredEvents/GetFilteredEvents.ts'
import * as InputName from '../InputName/InputName.ts'

const getSelectedEventIndex = (state: ChatDebugViewState): number | null => {
  const { selectedEventIndex } = state
  if (selectedEventIndex === null) {
    return null
  }
  const filteredEvents = getFilteredEvents(
    state.events,
    state.filterValue,
    state.eventCategoryFilter,
    state.showInputEvents,
    state.showResponsePartEvents,
    state.showEventStreamFinishedEvents,
  )
  const selectedEvent = filteredEvents[selectedEventIndex]
  if (!selectedEvent) {
    return null
  }
  const newIndex = filteredEvents.indexOf(selectedEvent)
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
  const oldFilteredEvents = getFilteredEvents(
    oldState.events,
    oldState.filterValue,
    oldState.eventCategoryFilter,
    oldState.showInputEvents,
    oldState.showResponsePartEvents,
    oldState.showEventStreamFinishedEvents,
  )
  const selectedEvent = oldFilteredEvents[selectedEventIndex]
  if (!selectedEvent) {
    return null
  }
  const newFilteredEvents = getFilteredEvents(
    newState.events,
    newState.filterValue,
    newState.eventCategoryFilter,
    newState.showInputEvents,
    newState.showResponsePartEvents,
    newState.showEventStreamFinishedEvents,
  )
  const newIndex = newFilteredEvents.indexOf(selectedEvent)
  if (newIndex === -1) {
    return null
  }
  return newIndex
}

const parseSelectedEventIndex = (value: string): number | null => {
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed < 0) {
    return null
  }
  return parsed
}

export const handleInput = (state: ChatDebugViewState, name: string, value: string, checked: string | boolean): ChatDebugViewState => {
  if (name === InputName.Filter) {
    const nextState = {
      ...state,
      filterValue: value,
    }
    return {
      ...nextState,
      selectedEventIndex: getPreservedSelectedEventIndex(state, nextState),
    }
  }
  if (name === InputName.EventCategoryFilter) {
    const nextState = {
      ...state,
      eventCategoryFilter: value || EventCategoryFilter.All,
    }
    return {
      ...nextState,
      selectedEventIndex: getPreservedSelectedEventIndex(state, nextState),
    }
  }
  if (name === InputName.ShowEventStreamFinishedEvents) {
    const nextState = {
      ...state,
      showEventStreamFinishedEvents: GetBoolean.getBoolean(checked),
    }
    return {
      ...nextState,
      selectedEventIndex: getPreservedSelectedEventIndex(state, nextState),
    }
  }
  if (name === InputName.ShowInputEvents) {
    const nextState = {
      ...state,
      showInputEvents: GetBoolean.getBoolean(checked),
    }
    return {
      ...nextState,
      selectedEventIndex: getPreservedSelectedEventIndex(state, nextState),
    }
  }
  if (name === InputName.ShowResponsePartEvents) {
    const nextState = {
      ...state,
      showResponsePartEvents: GetBoolean.getBoolean(checked),
    }
    return {
      ...nextState,
      selectedEventIndex: getPreservedSelectedEventIndex(state, nextState),
    }
  }
  if (name === InputName.UseDevtoolsLayout) {
    const useDevtoolsLayout = GetBoolean.getBoolean(checked)
    return {
      ...state,
      selectedEventIndex: useDevtoolsLayout ? getSelectedEventIndex(state) : null,
      useDevtoolsLayout,
    }
  }
  if (name === InputName.SelectedEventIndex) {
    return {
      ...state,
      selectedEventIndex: parseSelectedEventIndex(value),
    }
  }
  if (name === InputName.CloseDetails) {
    return {
      ...state,
      selectedEventIndex: null,
    }
  }
  return state
}
