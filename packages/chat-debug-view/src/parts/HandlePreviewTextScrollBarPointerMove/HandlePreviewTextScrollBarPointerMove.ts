import { getPreviewTextBodyY } from '../PreviewTextBodyY/PreviewTextBodyY.ts'
import { getPreviewTextViewportHeight, getPreviewVirtualizationState, setPreviewTextDeltaY } from '../PreviewVirtualization/PreviewVirtualization.ts'
import { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const handlePreviewTextScrollBarPointerMove = (state: ChatDebugViewState, eventY: number): ChatDebugViewState => {
  const { selectedEvent, previewTextScrollBarPointerActive, previewTextDeltaY, previewTextScrollBarHandleOffset } = state
  if (!previewTextScrollBarPointerActive) {
    return state
  }
  const viewportHeight = getPreviewTextViewportHeight(state)
  const virtualization = getPreviewVirtualizationState(selectedEvent, viewportHeight, previewTextDeltaY)
  if (viewportHeight === 0 || virtualization.scrollBarHeight === 0) {
    return state
  }
  const relativeY = eventY - getPreviewTextBodyY(state)
  const nextHandleTop = Math.max(0, Math.min(viewportHeight - virtualization.scrollBarHeight, relativeY - previewTextScrollBarHandleOffset))
  const percent = nextHandleTop / Math.max(1, viewportHeight - virtualization.scrollBarHeight)
  const nextState = setPreviewTextDeltaY(state, percent * virtualization.maxDeltaY)
  return {
    ...nextState,
    previewTextScrollBarPointerActive: true,
  }
}
