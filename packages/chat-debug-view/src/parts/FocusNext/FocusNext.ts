import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'
import { getCurrentEvents, selectEventAtIndex } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const focusNextDependencies = {
  loadSelectedEvent: LoadSelectedEvent.loadSelectedEvent,
}

export const focusNext = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  if (currentEvents.length === 0) {
    return state
  }
  const currentIndex = state.selectedEventIndex === null || state.selectedEventIndex < 0 ? -1 : state.selectedEventIndex
  const nextIndex = Math.min(currentEvents.length - 1, currentIndex + 1)
  if (nextIndex === state.selectedEventIndex) {
    return state
  }
  return selectEventAtIndex(state, nextIndex, focusNextDependencies)
}
