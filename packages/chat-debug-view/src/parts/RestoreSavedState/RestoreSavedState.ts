import type { SavedState } from '../SavedState/SavedState.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { parseFilterValue } from '../ParseFilterValue/ParseFilterValue.ts'
import { getOrderedVisibleTableColumns } from '../TableColumn/TableColumn.ts'

const validEventCategoryFilters = new Set<string>([
  EventCategoryFilter.All,
  EventCategoryFilter.Network,
  EventCategoryFilter.Stream,
  EventCategoryFilter.Tools,
  EventCategoryFilter.Ui,
])

const isSavedState = (value: unknown): value is Partial<SavedState> => {
  return typeof value === 'object' && value !== null
}

const restoreEventCategoryFilter = (savedState: Partial<SavedState>, currentEventCategoryFilter: string): string => {
  if (typeof savedState.eventCategoryFilter === 'string' && validEventCategoryFilters.has(savedState.eventCategoryFilter)) {
    return savedState.eventCategoryFilter
  }
  if (typeof savedState.filterValue === 'string') {
    return parseFilterValue(savedState.filterValue).eventCategoryFilter
  }
  return currentEventCategoryFilter
}

const restoreFilterValue = (savedState: Partial<SavedState>, currentFilterValue: string): string => {
  return typeof savedState.filterValue === 'string' ? savedState.filterValue : currentFilterValue
}

const restoreSelectedDetailTab = (savedState: Partial<SavedState>, currentSelectedDetailTab: string): string => {
  return typeof savedState.selectedDetailTab === 'string' && DetailTab.isDetailTab(savedState.selectedDetailTab)
    ? savedState.selectedDetailTab
    : currentSelectedDetailTab
}

const restoreSelectedEventId = (
  savedState: Partial<SavedState>,
  currentSelectedEventId: ChatDebugViewState['selectedEventId'],
): ChatDebugViewState['selectedEventId'] => {
  return typeof savedState.selectedEventId === 'number' || savedState.selectedEventId === null ? savedState.selectedEventId : currentSelectedEventId
}

const restoreTimelineEndSeconds = (savedState: Partial<SavedState>, currentTimelineEndSeconds: string): string => {
  return typeof savedState.timelineEndSeconds === 'string' ? savedState.timelineEndSeconds : currentTimelineEndSeconds
}

const restoreTimelineStartSeconds = (savedState: Partial<SavedState>, currentTimelineStartSeconds: string): string => {
  return typeof savedState.timelineStartSeconds === 'string' ? savedState.timelineStartSeconds : currentTimelineStartSeconds
}

const restoreVisibleTableColumns = (
  savedState: Partial<SavedState>,
  currentVisibleTableColumns: ChatDebugViewState['visibleTableColumns'],
): ChatDebugViewState['visibleTableColumns'] => {
  if (!Array.isArray(savedState.visibleTableColumns)) {
    return currentVisibleTableColumns
  }
  const visibleTableColumns = savedState.visibleTableColumns.filter((value): value is string => typeof value === 'string')
  return getOrderedVisibleTableColumns(visibleTableColumns)
}

export const restoreSavedState = (state: ChatDebugViewState, savedState: unknown): ChatDebugViewState => {
  if (!isSavedState(savedState)) {
    return state
  }
  return {
    ...state,
    eventCategoryFilter: restoreEventCategoryFilter(savedState, state.eventCategoryFilter),
    filterValue: restoreFilterValue(savedState, state.filterValue),
    selectedDetailTab: restoreSelectedDetailTab(savedState, state.selectedDetailTab),
    selectedEventId: restoreSelectedEventId(savedState, state.selectedEventId),
    timelineEndSeconds: restoreTimelineEndSeconds(savedState, state.timelineEndSeconds),
    timelineStartSeconds: restoreTimelineStartSeconds(savedState, state.timelineStartSeconds),
    visibleTableColumns: restoreVisibleTableColumns(savedState, state.visibleTableColumns),
  }
}
