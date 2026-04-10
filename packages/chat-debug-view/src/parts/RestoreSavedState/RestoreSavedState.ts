import type { SavedState } from '../SavedState/SavedState.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { parseFilterValue } from '../ParseFilterValue/ParseFilterValue.ts'
import { getOrderedVisibleTableColumns } from '../TableColumn/TableColumn.ts'
import { isTableColumnWidths } from '../TableColumnLayout/TableColumnLayout.ts'

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

const restoreCategoryFilters = (
  savedState: Partial<SavedState>,
  currentCategoryFilters: ChatDebugViewState['categoryFilters'],
): ChatDebugViewState['categoryFilters'] => {
  if (Array.isArray(savedState.eventCategoryFilters)) {
    return EventCategoryFilter.selectCategoryFilters(
      currentCategoryFilters,
      savedState.eventCategoryFilters.filter((value): value is string => typeof value === 'string'),
    )
  }
  if (typeof savedState.eventCategoryFilter === 'string' && validEventCategoryFilters.has(savedState.eventCategoryFilter)) {
    return EventCategoryFilter.selectCategoryFilter(currentCategoryFilters, savedState.eventCategoryFilter)
  }
  if (typeof savedState.filterValue === 'string') {
    return EventCategoryFilter.selectCategoryFilter(currentCategoryFilters, parseFilterValue(savedState.filterValue).eventCategoryFilter)
  }
  return currentCategoryFilters
}

const restoreFilterValue = (savedState: Partial<SavedState>, currentFilterValue: string): string => {
  return typeof savedState.filterValue === 'string' ? savedState.filterValue : currentFilterValue
}

const restoreDetailTabs = (
  savedState: Partial<SavedState>,
  currentDetailTabs: ChatDebugViewState['detailTabs'],
): ChatDebugViewState['detailTabs'] => {
  return typeof savedState.selectedDetailTab === 'string' && DetailTab.isDetailTab(savedState.selectedDetailTab)
    ? DetailTab.selectDetailTab(currentDetailTabs, savedState.selectedDetailTab)
    : currentDetailTabs
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

const restoreTableColumnWidths = (
  savedState: Partial<SavedState>,
  currentTableColumnWidths: ChatDebugViewState['tableColumnWidths'],
): ChatDebugViewState['tableColumnWidths'] => {
  return isTableColumnWidths(savedState.tableColumnWidths) ? savedState.tableColumnWidths : currentTableColumnWidths
}

export const restoreSavedState = (state: ChatDebugViewState, savedState: unknown): ChatDebugViewState => {
  if (!isSavedState(savedState)) {
    return state
  }
  return {
    ...state,
    categoryFilters: restoreCategoryFilters(savedState, state.categoryFilters),
    detailTabs: restoreDetailTabs(savedState, state.detailTabs),
    filterValue: restoreFilterValue(savedState, state.filterValue),
    selectedEventId: restoreSelectedEventId(savedState, state.selectedEventId),
    tableColumnWidths: restoreTableColumnWidths(savedState, state.tableColumnWidths),
    timelineEndSeconds: restoreTimelineEndSeconds(savedState, state.timelineEndSeconds),
    timelineStartSeconds: restoreTimelineStartSeconds(savedState, state.timelineStartSeconds),
    visibleTableColumns: restoreVisibleTableColumns(savedState, state.visibleTableColumns),
  }
}
