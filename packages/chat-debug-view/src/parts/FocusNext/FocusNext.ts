import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import { getCurrentEvents } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const focusNext = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  if (currentEvents.length === 0) {
    return state
  }
  const currentIndex = state.selectedEventIndex === null || state.selectedEventIndex < 0 ? -1 : state.selectedEventIndex
  const nextIndex = Math.min(currentEvents.length - 1, currentIndex + 1)
  return focusIndex(state, nextIndex)
}
