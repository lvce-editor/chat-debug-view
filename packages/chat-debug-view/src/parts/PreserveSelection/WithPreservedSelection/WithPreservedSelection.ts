import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import { getPreservedSelectedEventIndex } from '../GetPreservedSelectedEventIndex/GetPreservedSelectedEventIndex.ts'

export const withPreservedSelection = (state: ChatDebugViewState, nextState: ChatDebugViewState): ChatDebugViewState => {
  const selectedEventIndex = getPreservedSelectedEventIndex(state, nextState)
  return {
    ...nextState,
    selectedEvent: selectedEventIndex === null ? null : state.selectedEvent,
    selectedEventId: selectedEventIndex === null ? null : state.selectedEventId,
    selectedEventIndex,
  }
}
