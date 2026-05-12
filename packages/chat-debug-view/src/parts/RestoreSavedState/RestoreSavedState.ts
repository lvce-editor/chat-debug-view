import type { SavedState } from '../SavedState/SavedState.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import * as IsDetailTab from '../IsDetailTab/IsDetailTab.ts'
import { parseFilterValue } from '../ParseFilterValue/ParseFilterValue.ts'
import * as SelectDetailTab from '../SelectDetailTab/SelectDetailTab.ts'
import { getTableColumnsWithVisibility } from '../TableColumn/TableColumn.ts'
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

type LegacyTableColumnWidths = {
  readonly duration: number
  readonly method: number
  readonly status: number
  readonly type: number
}

const isLegacyTableColumnWidths = (value: unknown): value is LegacyTableColumnWidths => {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const record = value as Record<string, unknown>
  return (
    typeof record.duration === 'number' &&
    Number.isFinite(record.duration) &&
    typeof record.method === 'number' &&
    Number.isFinite(record.method) &&
    typeof record.status === 'number' &&
    Number.isFinite(record.status) &&
    typeof record.type === 'number' &&
    Number.isFinite(record.type) &&
    !('size' in record)
  )
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
  return typeof savedState.selectedDetailTab === 'string' && IsDetailTab.isDetailTab(savedState.selectedDetailTab)
    ? SelectDetailTab.selectDetailTab(currentDetailTabs, savedState.selectedDetailTab)
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
  currentTableColumns: ChatDebugViewState['tableColumns'],
): ChatDebugViewState['tableColumns'] => {
  if (!Array.isArray(savedState.visibleTableColumns)) {
    return currentTableColumns
  }
  const visibleTableColumns = savedState.visibleTableColumns.filter((value): value is string => typeof value === 'string')
  if (isLegacyTableColumnWidths(savedState.tableColumnWidths)) {
    const savedVisibleColumns = new Set(visibleTableColumns)
    const visibleColumnsWithDefaults = currentTableColumns
      .filter((column) => savedVisibleColumns.has(column.name) || column.name === 'size')
      .map((column) => column.name)
    return getTableColumnsWithVisibility(currentTableColumns, visibleColumnsWithDefaults)
  }
  return getTableColumnsWithVisibility(currentTableColumns, visibleTableColumns)
}

const restoreTableColumnWidths = (
  savedState: Partial<SavedState>,
  currentTableColumnWidths: ChatDebugViewState['tableColumnWidths'],
): ChatDebugViewState['tableColumnWidths'] => {
  const { tableColumnWidths: savedTableColumnWidths } = savedState
  if (isTableColumnWidths(savedTableColumnWidths)) {
    return savedTableColumnWidths
  }
  if (isLegacyTableColumnWidths(savedTableColumnWidths)) {
    const legacyTableColumnWidths = savedTableColumnWidths as LegacyTableColumnWidths
    return {
      duration: legacyTableColumnWidths.duration,
      method: legacyTableColumnWidths.method,
      size: currentTableColumnWidths.size,
      status: legacyTableColumnWidths.status,
      type: legacyTableColumnWidths.type,
    }
  }
  return currentTableColumnWidths
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
    tableColumns: restoreVisibleTableColumns(savedState, state.tableColumns),
    tableColumnWidths: restoreTableColumnWidths(savedState, state.tableColumnWidths),
    timelineEndSeconds: restoreTimelineEndSeconds(savedState, state.timelineEndSeconds),
    timelineStartSeconds: restoreTimelineStartSeconds(savedState, state.timelineStartSeconds),
  }
}
