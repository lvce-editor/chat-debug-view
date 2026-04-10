import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import { getCurrentEvents } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const focusPrevious = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  if (currentEvents.length === 0) {
    return state
  }
  const currentIndex =
    state.selectedEventIndex === null || state.selectedEventIndex >= currentEvents.length ? currentEvents.length : state.selectedEventIndex
  const nextIndex = Math.max(0, currentIndex - 1)
  return focusIndex(state, nextIndex)
}
