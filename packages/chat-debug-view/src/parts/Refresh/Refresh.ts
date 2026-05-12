import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { refreshEvents } from '../LoadEvents/RefreshEvents/RefreshEvents.ts'

export const refresh = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  return refreshEvents(state)
}
