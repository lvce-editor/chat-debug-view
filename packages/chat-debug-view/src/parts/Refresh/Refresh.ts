import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import {  refreshEvents } from '../LoadEvents/LoadEvents.ts'



export const refresh = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  return refreshEvents(state)
}

export {loadEventsDependencies as refreshDependencies} from '../LoadEvents/LoadEvents.ts'