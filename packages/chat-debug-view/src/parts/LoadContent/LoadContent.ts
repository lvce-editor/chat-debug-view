import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import * as HandleStorageWorkerUpdate from '../HandleStorageWorkerUpdate/HandleStorageWorkerUpdate.ts'
import { loadEventsFromUri } from '../LoadEvents/LoadEvents.ts'
import { loadEventsDependencies } from '../LoadEvents/LoadEvents.ts'
import { restoreSavedState } from '../RestoreSavedState/RestoreSavedState.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const loadContentDependencies = loadEventsDependencies as typeof loadEventsDependencies & {
  registerUpdateListener: typeof ChatStorageWorkerClient.registerUpdateListener
}

loadContentDependencies.registerUpdateListener = ChatStorageWorkerClient.registerUpdateListener

export const loadContent = async (state: ChatDebugViewState, savedState: unknown): Promise<ChatDebugViewState> => {
  await RendererWorker.getPreference('chatDebug.autoRefresh')
  const nextState = await loadEventsFromUri(restoreSavedState(state, savedState))
  if (nextState.sessionId) {
    try {
      await loadContentDependencies.registerUpdateListener(nextState.sessionId, HandleStorageWorkerUpdate.rpcId, nextState.uid)
    } catch {
      // ignore
    }
  }
  return {
    ...nextState,
    categoryFilters: EventCategoryFilter.createCategoryFilters(EventCategoryFilter.getSelectedEventCategoryFilters(nextState.categoryFilters)),
    detailTabs: DetailTab.createDetailTabs(DetailTab.getSelectedDetailTab(nextState.detailTabs), nextState.selectedEvent),
    tableColumns: TableColumn.createTableColumns(),
  }
}
