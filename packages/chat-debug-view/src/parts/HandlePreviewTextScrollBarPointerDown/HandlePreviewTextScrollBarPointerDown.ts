import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getPreviewTextBodyY } from '../PreviewTextBodyY/PreviewTextBodyY.ts'
import { getPreviewTextViewportHeight, getPreviewVirtualizationState, setPreviewTextDeltaY } from '../PreviewVirtualization/PreviewVirtualization.ts'

const getHandleOffsetAndPercent = (
  viewportHeight: number,
  scrollBarHeight: number,
  relativeY: number,
): { readonly handleOffset: number; readonly percent: number } => {
  const halfScrollBarHeight = scrollBarHeight / 2
  if (relativeY <= halfScrollBarHeight) {
    return {
      handleOffset: relativeY,
      percent: 0,
    }
  }
  if (relativeY <= viewportHeight - halfScrollBarHeight) {
    return {
      handleOffset: halfScrollBarHeight,
      percent: (relativeY - halfScrollBarHeight) / Math.max(1, viewportHeight - scrollBarHeight),
    }
  }
  return {
    handleOffset: scrollBarHeight - viewportHeight + relativeY,
    percent: 1,
  }
}

export const handlePreviewTextScrollBarPointerDown = (state: ChatDebugViewState, eventY: number): ChatDebugViewState => {
  const viewportHeight = getPreviewTextViewportHeight(state)
  const virtualization = getPreviewVirtualizationState(state.selectedEvent, viewportHeight, state.previewTextDeltaY)
  const bodyY = getPreviewTextBodyY(state)
  const relativeY = eventY - bodyY
  if (virtualization.viewportHeight === 0 || virtualization.scrollBarHeight === 0) {
    return state
  }
  const { handleOffset, percent } = getHandleOffsetAndPercent(virtualization.viewportHeight, virtualization.scrollBarHeight, relativeY)
  const nextState = setPreviewTextDeltaY(state, percent * virtualization.maxDeltaY)
  return {
    ...nextState,
    previewTextScrollBarHandleOffset: handleOffset,
    previewTextScrollBarPointerActive: true,
  }
}
