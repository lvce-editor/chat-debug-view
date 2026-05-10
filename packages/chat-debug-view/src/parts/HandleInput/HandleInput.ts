import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import * as GetBoolean from '../GetBoolean/GetBoolean.ts'
import { getStateWithTimelineInfo } from '../GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import * as InputName from '../InputName/InputName.ts'
import * as IsDetailTab from '../IsDetailTab/IsDetailTab.ts'
import { getCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'
import * as SelectDetailTab from '../SelectDetailTab/SelectDetailTab.ts'
import { applyVirtualTableState, withSelectedEventVisible } from '../VirtualTable/VirtualTable.ts'

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
  const nextStateWithTimelineInfo = getStateWithTimelineInfo(nextState)
  const selectedEventIndex = getPreservedSelectedEventIndex(state, nextStateWithTimelineInfo)
  return withSelectedEventVisible({
    ...nextStateWithTimelineInfo,
    previewTextCursorColumnIndex: selectedEventIndex === null ? null : state.previewTextCursorColumnIndex,
    previewTextCursorRowIndex: selectedEventIndex === null ? null : state.previewTextCursorRowIndex,
    selectedEvent: selectedEventIndex === null ? null : state.selectedEvent,
    selectedEventId: selectedEventIndex === null ? null : state.selectedEventId,
    selectedEventIndex,
  })
}

type InputHandler = (state: ChatDebugViewState, value: string, checked: string | boolean) => ChatDebugViewState

const updateWithPreservedSelection = (state: ChatDebugViewState, updates: Partial<ChatDebugViewState>): ChatDebugViewState => {
  return withPreservedSelection(state, {
    ...state,
    ...updates,
  })
}

const handleFilter: InputHandler = (state, value) => {
  return updateWithPreservedSelection(state, { filterValue: value })
}

const handleEventCategoryFilter: InputHandler = (state, value) => {
  const categoryFilters = EventCategoryFilter.selectCategoryFilter(state.categoryFilters, value || EventCategoryFilter.All)
  if (categoryFilters === state.categoryFilters) {
    return state
  }
  return updateWithPreservedSelection(state, { categoryFilters })
}

const handleShowEventStreamFinishedEvents: InputHandler = (state, _value, checked) => {
  return updateWithPreservedSelection(state, {
    showEventStreamFinishedEvents: GetBoolean.getBoolean(checked),
  })
}

const handleShowInputEvents: InputHandler = (state, _value, checked) => {
  return updateWithPreservedSelection(state, {
    showInputEvents: GetBoolean.getBoolean(checked),
  })
}

const handleShowResponsePartEvents: InputHandler = (state, _value, checked) => {
  return updateWithPreservedSelection(state, {
    showResponsePartEvents: GetBoolean.getBoolean(checked),
  })
}

const handleUseDevtoolsLayout: InputHandler = (state, _value, checked) => {
  const useDevtoolsLayout = GetBoolean.getBoolean(checked)
  const selectedEventIndex = useDevtoolsLayout ? getSelectedEventIndex(state) : null
  const hasSelectedEvent = useDevtoolsLayout && selectedEventIndex !== null
  return applyVirtualTableState({
    ...state,
    previewTextCursorColumnIndex: hasSelectedEvent ? state.previewTextCursorColumnIndex : null,
    previewTextCursorRowIndex: hasSelectedEvent ? state.previewTextCursorRowIndex : null,
    selectedEvent: hasSelectedEvent ? state.selectedEvent : null,
    selectedEventId: hasSelectedEvent ? state.selectedEventId : null,
    selectedEventIndex,
    useDevtoolsLayout,
  })
}

const handleSelectedEventIndex: InputHandler = (state, value) => {
  const selectedEventIndex = parseSelectedEventIndex(value)
  const hasSelectedEvent = selectedEventIndex !== null
  return withSelectedEventVisible({
    ...state,
    previewTextCursorColumnIndex: hasSelectedEvent ? state.previewTextCursorColumnIndex : null,
    previewTextCursorRowIndex: hasSelectedEvent ? state.previewTextCursorRowIndex : null,
    selectedEvent: hasSelectedEvent ? state.selectedEvent : null,
    selectedEventId: hasSelectedEvent ? state.selectedEventId : null,
    selectedEventIndex,
  })
}

const handleTimelineStartSeconds: InputHandler = (state, value) => {
  return updateWithPreservedSelection(state, { timelineStartSeconds: value })
}

const handleTimelineEndSeconds: InputHandler = (state, value) => {
  return updateWithPreservedSelection(state, { timelineEndSeconds: value })
}

const handleTimelineRangePreset: InputHandler = (state, value) => {
  return updateWithPreservedSelection(state, parseTimelineRangePreset(value))
}

const handleCloseDetails: InputHandler = (state) => {
  return applyVirtualTableState({
    ...state,
    previewTextCursorColumnIndex: null,
    previewTextCursorRowIndex: null,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
  })
}

const handleDetailTab: InputHandler = (state, value) => {
  if (!IsDetailTab.isDetailTab(value)) {
    return state
  }
  const detailTabs = SelectDetailTab.selectDetailTab(state.detailTabs, value)
  if (detailTabs === state.detailTabs) {
    return state
  }
  return {
    ...state,
    detailTabs,
  }
}

const inputHandlers: Record<string, InputHandler> = {
  [InputName.CloseDetails]: handleCloseDetails,
  [InputName.DetailTab]: handleDetailTab,
  [InputName.EventCategoryFilter]: handleEventCategoryFilter,
  [InputName.Filter]: handleFilter,
  [InputName.SelectedEventIndex]: handleSelectedEventIndex,
  [InputName.ShowEventStreamFinishedEvents]: handleShowEventStreamFinishedEvents,
  [InputName.ShowInputEvents]: handleShowInputEvents,
  [InputName.ShowResponsePartEvents]: handleShowResponsePartEvents,
  [InputName.TimelineEndSeconds]: handleTimelineEndSeconds,
  [InputName.TimelineRangePreset]: handleTimelineRangePreset,
  [InputName.TimelineStartSeconds]: handleTimelineStartSeconds,
  [InputName.UseDevtoolsLayout]: handleUseDevtoolsLayout,
}

export const handleInput = (state: ChatDebugViewState, name: string, value: string, checked: string | boolean): ChatDebugViewState => {
  const handler = inputHandlers[name]
  if (!handler) {
    return state
  }
  return handler(state, value, checked)
}
