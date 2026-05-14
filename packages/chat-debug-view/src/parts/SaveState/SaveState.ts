import type { SavedState } from '../SavedState/SavedState.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { getSelectedDetailTab } from '../GetSelectedDetailTab/GetSelectedDetailTab.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const saveState = (state: ChatDebugViewState): SavedState => {
  const { categoryFilters, detailTabs, filterValue, selectedEventId, sessionId, tableColumns, timelineEndSeconds, timelineStartSeconds } = state
  return {
    eventCategoryFilter: EventCategoryFilter.getSelectedEventCategoryFilter(categoryFilters),
    eventCategoryFilters: EventCategoryFilter.getSelectedEventCategoryFilters(categoryFilters),
    filterValue,
    selectedDetailTab: getSelectedDetailTab(detailTabs),
    selectedEventId,
    sessionId,
    tableColumnWidths: TableColumn.getTableColumnWidths(tableColumns),
    timelineEndSeconds,
    timelineStartSeconds,
    visibleTableColumns: TableColumn.getVisibleTableColumns(tableColumns),
  }
}
