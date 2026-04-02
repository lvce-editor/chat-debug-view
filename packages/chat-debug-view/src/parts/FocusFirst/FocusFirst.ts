import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'
import { getCurrentEvents, selectEventAtIndex } from '../SelectEventAtIndex/SelectEventAtIndex.ts'

export const focusFirstDependencies = {
  loadSelectedEvent: LoadSelectedEvent.loadSelectedEvent,
}

export const focusFirst = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  if (currentEvents.length === 0 || state.selectedEventIndex === 0) {
    return state
  }
  return selectEventAtIndex(state, 0, focusFirstDependencies)
}