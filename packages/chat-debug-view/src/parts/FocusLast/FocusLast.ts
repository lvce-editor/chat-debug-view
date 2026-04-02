import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'
import { getCurrentEvents, selectEventAtIndex } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const focusLastDependencies = {
  loadSelectedEvent: LoadSelectedEvent.loadSelectedEvent,
}

export const focusLast = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  if (currentEvents.length === 0) {
    return state
  }
  const lastIndex = currentEvents.length - 1
  if (state.selectedEventIndex === lastIndex) {
    return state
  }
  return selectEventAtIndex(state, lastIndex, focusLastDependencies)
}