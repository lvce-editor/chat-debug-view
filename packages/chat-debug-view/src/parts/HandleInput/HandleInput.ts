import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import * as GetBoolean from '../GetBoolean/GetBoolean.ts'
import { getFilteredEvents } from '../GetFilteredEvents/GetFilteredEvents.ts'
import { filterEventsByTimelineRange } from '../GetTimelineInfo/GetTimelineInfo.ts'
import * as InputName from '../InputName/InputName.ts'

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

const parseTimelineRangePreset = (value: string): { readonly timelineEndSeconds: string; readonly timelineStartSeconds: string } => {
  if (!value) {
    return {
      timelineEndSeconds: '',
      timelineStartSeconds: '',
    }
  }
  const [timelineStartSeconds = '', timelineEndSeconds = ''] = value.split(':', 2)
  return {
    timelineEndSeconds,
    timelineStartSeconds,
  }
}

const getEventIndexByStableId = (events: readonly ChatViewEvent[], event: ChatViewEvent): number => {
  return events.findIndex((candidate) => candidate.eventId === event.eventId)
}

const getSelectedEventIndex = (state: ChatDebugViewState): number | null => {
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

const parseSelectedEventIndex = (value: string): number | null => {
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed < 0) {
    return null
  }
  return parsed
}

const withPreservedSelection = (state: ChatDebugViewState, nextState: ChatDebugViewState): ChatDebugViewState => {
  const selectedEventIndex = getPreservedSelectedEventIndex(state, nextState)
  return {
    ...nextState,
    selectedEvent: selectedEventIndex === null ? null : state.selectedEvent,
    selectedEventId: selectedEventIndex === null ? null : state.selectedEventId,
    selectedEventIndex,
  }
}

export const handleInput = (state: ChatDebugViewState, name: string, value: string, checked: string | boolean): ChatDebugViewState => {
  if (name === InputName.Filter) {
    const nextState = {
      ...state,
      filterValue: value,
    }
    return withPreservedSelection(state, nextState)
  }
  if (name === InputName.EventCategoryFilter) {
    const nextState = {
      ...state,
      eventCategoryFilter: value || EventCategoryFilter.All,
    }
    return withPreservedSelection(state, nextState)
  }
  if (name === InputName.ShowEventStreamFinishedEvents) {
    const nextState = {
      ...state,
      showEventStreamFinishedEvents: GetBoolean.getBoolean(checked),
    }
    return withPreservedSelection(state, nextState)
  }
  if (name === InputName.ShowInputEvents) {
    const nextState = {
      ...state,
      showInputEvents: GetBoolean.getBoolean(checked),
    }
    return withPreservedSelection(state, nextState)
  }
  if (name === InputName.ShowResponsePartEvents) {
    const nextState = {
      ...state,
      showResponsePartEvents: GetBoolean.getBoolean(checked),
    }
    return withPreservedSelection(state, nextState)
  }
  if (name === InputName.UseDevtoolsLayout) {
    const useDevtoolsLayout = GetBoolean.getBoolean(checked)
    const selectedEventIndex = useDevtoolsLayout ? getSelectedEventIndex(state) : null
    return {
      ...state,
      selectedEvent: useDevtoolsLayout && selectedEventIndex !== null ? state.selectedEvent : null,
      selectedEventId: useDevtoolsLayout && selectedEventIndex !== null ? state.selectedEventId : null,
      selectedEventIndex,
      useDevtoolsLayout,
    }
  }
  if (name === InputName.SelectedEventIndex) {
    const selectedEventIndex = parseSelectedEventIndex(value)
    return {
      ...state,
      selectedEvent: selectedEventIndex === null ? null : state.selectedEvent,
      selectedEventId: selectedEventIndex === null ? null : state.selectedEventId,
      selectedEventIndex,
    }
  }
  if (name === InputName.TimelineStartSeconds) {
    const nextState = {
      ...state,
      timelineStartSeconds: value,
    }
    return withPreservedSelection(state, nextState)
  }
  if (name === InputName.TimelineEndSeconds) {
    const nextState = {
      ...state,
      timelineEndSeconds: value,
    }
    return withPreservedSelection(state, nextState)
  }
  if (name === InputName.TimelineRangePreset) {
    const nextState = {
      ...state,
      ...parseTimelineRangePreset(value),
    }
    return withPreservedSelection(state, nextState)
  }
  if (name === InputName.CloseDetails) {
    return {
      ...state,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
    }
  }
  if (name === InputName.DetailTab) {
    if (!DetailTab.isDetailTab(value)) {
      return state
    }
    return {
      ...state,
      selectedDetailTab: value,
    }
  }
  return state
}
