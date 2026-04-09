import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { loadEventsFromUri } from '../LoadEvents/LoadEvents.ts'

export { loadEventsDependencies as loadContentDependencies } from '../LoadEvents/LoadEvents.ts'

export const loadContent = async (state: ChatDebugViewState, savedState: unknown): Promise<ChatDebugViewState> => {
  return loadEventsFromUri(state)
}
