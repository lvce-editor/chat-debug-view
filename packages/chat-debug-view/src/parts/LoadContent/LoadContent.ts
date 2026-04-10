import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import { loadEventsFromUri } from '../LoadEvents/LoadEvents.ts'
import { restoreSavedState } from '../RestoreSavedState/RestoreSavedState.ts'

export { loadEventsDependencies as loadContentDependencies } from '../LoadEvents/LoadEvents.ts'

export const loadContent = async (state: ChatDebugViewState, savedState: unknown): Promise<ChatDebugViewState> => {
  const nextState = await loadEventsFromUri(restoreSavedState(state, savedState))
  return {
    ...nextState,
    detailTabs: DetailTab.createDetailTabs(),
  }
}
