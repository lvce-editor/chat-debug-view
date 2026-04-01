import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { loadEventsDependencies, loadEventsFromUri } from '../LoadEvents/LoadEvents.ts'

export { loadEventsDependencies as loadContentDependencies } from '../LoadEvents/LoadEvents.ts'

export const loadContent = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  return loadEventsFromUri(state)
}
