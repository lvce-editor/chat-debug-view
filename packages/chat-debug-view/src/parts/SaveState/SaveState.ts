import type { SavedState } from '../SavedState/SavedState.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'

export const saveState = (state: ChatDebugViewState): SavedState => {
  const {
    categoryFilters,
    detailTabs,
    filterValue,
    selectedEventId,
    sessionId,
    tableColumnWidths,
    timelineEndSeconds,
    timelineStartSeconds,
    visibleTableColumns,
  } = state
  return {
    eventCategoryFilter: EventCategoryFilter.getSelectedEventCategoryFilter(categoryFilters),
    eventCategoryFilters: EventCategoryFilter.getSelectedEventCategoryFilters(categoryFilters),
    filterValue,
    selectedDetailTab: DetailTab.getSelectedDetailTab(detailTabs),
    selectedEventId,
    sessionId,
    tableColumnWidths,
    timelineEndSeconds,
    timelineStartSeconds,
    visibleTableColumns,
  }
}
