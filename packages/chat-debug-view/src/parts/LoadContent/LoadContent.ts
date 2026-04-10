import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { loadEventsFromUri } from '../LoadEvents/LoadEvents.ts'
import { restoreSavedState } from '../RestoreSavedState/RestoreSavedState.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export { loadEventsDependencies as loadContentDependencies } from '../LoadEvents/LoadEvents.ts'

export const loadContent = async (state: ChatDebugViewState, savedState: unknown): Promise<ChatDebugViewState> => {
  const nextState = await loadEventsFromUri(restoreSavedState(state, savedState))
  return {
    ...nextState,
    categoryFilters: EventCategoryFilter.createCategoryFilters(EventCategoryFilter.getSelectedEventCategoryFilters(nextState.categoryFilters)),
    detailTabs: DetailTab.createDetailTabs(DetailTab.getSelectedDetailTab(nextState.detailTabs), nextState.selectedEvent),
    tableColumns: TableColumn.createTableColumns(),
  }
}
