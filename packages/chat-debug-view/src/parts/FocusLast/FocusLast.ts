import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import { getCurrentEvents } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const focusLast = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  if (currentEvents.length === 0) {
    return state
  }
  const lastIndex = currentEvents.length - 1
  return focusIndex(state, lastIndex)
}
