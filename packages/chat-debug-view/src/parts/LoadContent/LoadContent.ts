import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { registerUpdateListener } from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'
import { createDetailTabs } from '../CreateDetailTabs/CreateDetailTabs.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { getSelectedDetailTab } from '../GetSelectedDetailTab/GetSelectedDetailTab.ts'
import * as HandleStorageWorkerUpdate from '../HandleStorageWorkerUpdate/HandleStorageWorkerUpdate.ts'
import { loadEventsFromUri } from '../LoadEvents/LoadEventsFromUri/LoadEventsFromUri.ts'
import { restoreSavedState } from '../RestoreSavedState/RestoreSavedState.ts'
import { applyVirtualTableState } from '../VirtualTable/VirtualTable.ts'

export const loadContent = async (state: ChatDebugViewState, savedState: unknown): Promise<ChatDebugViewState> => {
  await RendererWorker.getPreference('chatDebug.autoRefresh')
  const restoredState = restoreSavedState(state, savedState)
  const nextState = await loadEventsFromUri(restoredState)
  if (nextState.sessionId) {
    try {
      await registerUpdateListener(nextState.sessionId, HandleStorageWorkerUpdate.rpcId, nextState.uid)
    } catch {
      // ignore
    }
  }
  return applyVirtualTableState({
    ...nextState,
    categoryFilters: EventCategoryFilter.createCategoryFilters(EventCategoryFilter.getSelectedEventCategoryFilters(nextState.categoryFilters)),
    detailTabs: createDetailTabs(getSelectedDetailTab(nextState.detailTabs), nextState.selectedEvent),
  })
}
