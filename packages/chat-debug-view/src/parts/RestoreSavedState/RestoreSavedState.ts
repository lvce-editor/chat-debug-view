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

const getRestoredEventCategoryFilter = (savedState: Partial<SavedState>, currentEventCategoryFilter: string): string => {
  if (typeof savedState.eventCategoryFilter === 'string' && validEventCategoryFilters.has(savedState.eventCategoryFilter)) {
    return savedState.eventCategoryFilter
  }
  if (typeof savedState.filterValue === 'string') {
    return parseFilterValue(savedState.filterValue).eventCategoryFilter
  }
  return currentEventCategoryFilter
}

export const restoreSavedState = (state: ChatDebugViewState, savedState: unknown): ChatDebugViewState => {
  if (!isSavedState(savedState)) {
    return state
  }
  const restoredVisibleTableColumns = Array.isArray(savedState.visibleTableColumns)
    ? getOrderedVisibleTableColumns(savedState.visibleTableColumns.filter((value): value is string => typeof value === 'string'))
    : state.visibleTableColumns
  return {
    ...state,
    eventCategoryFilter: getRestoredEventCategoryFilter(savedState, state.eventCategoryFilter),
    filterValue: typeof savedState.filterValue === 'string' ? savedState.filterValue : state.filterValue,
    selectedDetailTab:
      typeof savedState.selectedDetailTab === 'string' && DetailTab.isDetailTab(savedState.selectedDetailTab)
        ? savedState.selectedDetailTab
        : state.selectedDetailTab,
    selectedEventId:
      typeof savedState.selectedEventId === 'number' || savedState.selectedEventId === null ? savedState.selectedEventId : state.selectedEventId,
    timelineEndSeconds: typeof savedState.timelineEndSeconds === 'string' ? savedState.timelineEndSeconds : state.timelineEndSeconds,
    timelineStartSeconds: typeof savedState.timelineStartSeconds === 'string' ? savedState.timelineStartSeconds : state.timelineStartSeconds,
    visibleTableColumns: restoredVisibleTableColumns,
  }
}
