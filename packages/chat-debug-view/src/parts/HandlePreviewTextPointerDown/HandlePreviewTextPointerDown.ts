import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getPreviewEvent } from '../GetPreviewEvent/GetPreviewEvent.ts'
import { isChatMessageUpdatedEvent } from '../IsChatMessageUpdatedEvent/IsChatMessageUpdatedEvent.ts'
import { getPreviewTextCursorFromPoint } from '../PreviewTextCursor/PreviewTextCursor.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

const hasNumberedTextPreview = (state: ChatDebugViewState, previewEvent: unknown): previewEvent is string => {
  if (typeof previewEvent !== 'string') {
    return false
  }
  if (previewEvent === UiStrings.ImageCouldNotBeLoaded) {
    return false
  }
  return !state.selectedEvent || !isChatMessageUpdatedEvent(state.selectedEvent)
}

export const handlePreviewTextPointerDown = (state: ChatDebugViewState, x: number, y: number): ChatDebugViewState => {
  if (!state.selectedEvent) {
    return state
  }
  const previewEvent = getPreviewEvent(state.selectedEvent)
  if (!hasNumberedTextPreview(state, previewEvent)) {
    return state
  }
  const cursor = getPreviewTextCursorFromPoint(previewEvent, x, y)
  if (state.previewTextCursorColumnIndex === cursor.columnIndex && state.previewTextCursorRowIndex === cursor.rowIndex) {
    return state
  }
  return {
    ...state,
    previewTextCursorColumnIndex: cursor.columnIndex,
    previewTextCursorRowIndex: cursor.rowIndex,
  }
}
