import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getPreviewTextBodyY } from '../PreviewTextBodyY/PreviewTextBodyY.ts'
import { getPreviewTextViewportHeight, getPreviewVirtualizationState, setPreviewTextDeltaY } from '../PreviewVirtualization/PreviewVirtualization.ts'

export const handlePreviewTextScrollBarPointerMove = (state: ChatDebugViewState, eventY: number): ChatDebugViewState => {
  if (!state.previewTextScrollBarPointerActive) {
    return state
  }
  const viewportHeight = getPreviewTextViewportHeight(state)
  const virtualization = getPreviewVirtualizationState(state.selectedEvent, viewportHeight, state.previewTextDeltaY)
  if (viewportHeight === 0 || virtualization.scrollBarHeight === 0) {
    return state
  }
  const relativeY = eventY - getPreviewTextBodyY(state)
  const nextHandleTop = Math.max(0, Math.min(viewportHeight - virtualization.scrollBarHeight, relativeY - state.previewTextScrollBarHandleOffset))
  const percent = nextHandleTop / Math.max(1, viewportHeight - virtualization.scrollBarHeight)
  const nextState = setPreviewTextDeltaY(state, percent * virtualization.maxDeltaY)
  return {
    ...nextState,
    previewTextScrollBarPointerActive: true,
  }
}
