import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import { getCurrentEvents } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const selectCurrent = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  if (currentEvents.length === 0) {
    return state
  }
  const selectedEventIndex = state.selectedEventIndex === null ? 0 : state.selectedEventIndex
  return focusIndex(state, selectedEventIndex)
}
