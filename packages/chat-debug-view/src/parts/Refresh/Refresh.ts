import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { loadEventsDependencies, refreshEvents } from '../LoadEvents/LoadEvents.ts'

export const refreshDependencies = loadEventsDependencies

export const refresh = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  return refreshEvents(state)
}
