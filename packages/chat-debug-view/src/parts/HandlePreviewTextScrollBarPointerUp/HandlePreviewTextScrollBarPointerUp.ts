import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const handlePreviewTextScrollBarPointerUp = (state: ChatDebugViewState): ChatDebugViewState => {
  if (!state.previewTextScrollBarPointerActive && state.previewTextScrollBarHandleOffset === 0) {
    return state
  }
  return {
    ...state,
    previewTextScrollBarHandleOffset: 0,
    previewTextScrollBarPointerActive: false,
  }
}
