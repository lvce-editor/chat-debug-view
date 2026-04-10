import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getCurrentEvents, selectEventAtIndex } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const focusIndex = async (state: ChatDebugViewState, index: number): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  if (currentEvents.length === 0 || state.selectedEventIndex === index) {
    return state
  }
  return selectEventAtIndex(state, index)
}
