import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { loadEventsDependencies, loadEventsFromUri } from '../LoadEvents/LoadEvents.ts'

export const loadContentDependencies = loadEventsDependencies

export const loadContent = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  return loadEventsFromUri(state)
}
