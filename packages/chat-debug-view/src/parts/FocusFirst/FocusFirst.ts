import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getCurrentEvents, selectEventAtIndex } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const focusFirst = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  if (currentEvents.length === 0 || state.selectedEventIndex === 0) {
    return state
  }
  return selectEventAtIndex(state, 0)
}
