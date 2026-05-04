import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const handleCloseDetails = (state: ChatDebugViewState): ChatDebugViewState => {
  return {
    ...state,
    previewTextCursorColumnIndex: null,
    previewTextCursorRowIndex: null,
    previewTextDeltaY: 0,
    previewTextScrollBarHandleOffset: 0,
    previewTextScrollBarPointerActive: false,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
  }
}
