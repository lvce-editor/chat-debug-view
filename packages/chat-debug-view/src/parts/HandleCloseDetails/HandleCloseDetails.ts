import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const handleCloseDetails = (state: ChatDebugViewState): ChatDebugViewState => {
  return {
    ...state,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
  }
}
