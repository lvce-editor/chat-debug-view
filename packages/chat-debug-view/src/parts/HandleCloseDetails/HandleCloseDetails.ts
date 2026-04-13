import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const handleCloseDetails = (state: ChatDebugViewState): ChatDebugViewState => {
  return {
    ...state,
    previewTextCursorColumnIndex: null,
    previewTextCursorRowIndex: null,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
  }
}
