import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getPreviewEvent } from '../GetPreviewEvent/GetPreviewEvent.ts'
import { previewTextRowHeight } from '../PreviewTextCursor/PreviewTextCursor.ts'
import { getScrollBarHeight, getScrollBarOffset } from '../VirtualTable/VirtualTable.ts'
import { getTableBodyHeight } from '../VirtualTable/VirtualTable.ts'
import { isWriteFilePreview } from '../WriteFilePreview/WriteFilePreview.ts'

export interface PreviewVirtualizationState {
  readonly deltaY: number
  readonly endLineY: number
  readonly maxDeltaY: number
  readonly scrollBarHeight: number
  readonly scrollBarOffset: number
  readonly showScrollBar: boolean
  readonly startLineY: number
  readonly totalLineCount: number
  readonly viewportHeight: number
}

const getPreviewTextValue = (selectedEvent: ChatViewEvent | null): string | undefined => {
  if (!selectedEvent) {
    return undefined
  }
  const previewEvent = getPreviewEvent(selectedEvent)
  if (typeof previewEvent === 'string') {
    return previewEvent
  }
  if (isWriteFilePreview(previewEvent)) {
    return previewEvent.content
  }
  return undefined
}

export const getPreviewTextLineCount = (selectedEvent: ChatViewEvent | null): number => {
  const value = getPreviewTextValue(selectedEvent)
  if (value === undefined) {
    return 0
  }
  return value.split('\n').length
}

export const getPreviewTextViewportHeight = (state: ChatDebugViewState): number => {
  if (!state.selectedEvent) {
    return 0
  }
  return getTableBodyHeight(state, 1)
}

export const getPreviewTextMaxDeltaY = (lineCount: number, viewportHeight: number): number => {
  return Math.max(lineCount * previewTextRowHeight - viewportHeight, 0)
}

export const clampPreviewTextDeltaY = (deltaY: number, lineCount: number, viewportHeight: number): number => {
  const maxDeltaY = getPreviewTextMaxDeltaY(lineCount, viewportHeight)
  if (deltaY < 0) {
    return 0
  }
  if (deltaY > maxDeltaY) {
    return maxDeltaY
  }
  return deltaY
}

export const getPreviewVirtualizationState = (
  selectedEvent: ChatViewEvent | null,
  viewportHeight: number,
  deltaY: number,
): PreviewVirtualizationState => {
  const totalLineCount = getPreviewTextLineCount(selectedEvent)
  const clampedDeltaY = clampPreviewTextDeltaY(deltaY, totalLineCount, viewportHeight)
  const startLineY = Math.floor(clampedDeltaY / previewTextRowHeight)
  const visibleLineCount = viewportHeight <= 0 ? 0 : Math.max(1, Math.ceil(viewportHeight / previewTextRowHeight))
  const endLineY = Math.min(totalLineCount, startLineY + visibleLineCount)
  const maxDeltaY = getPreviewTextMaxDeltaY(totalLineCount, viewportHeight)
  const scrollBarHeight = getScrollBarHeight(totalLineCount, viewportHeight)
  const scrollBarOffset = getScrollBarOffset(clampedDeltaY, maxDeltaY, viewportHeight, scrollBarHeight)
  return {
    deltaY: clampedDeltaY,
    endLineY,
    maxDeltaY,
    scrollBarHeight,
    scrollBarOffset,
    showScrollBar: scrollBarHeight > 0,
    startLineY,
    totalLineCount,
    viewportHeight,
  }
}

export const setPreviewTextDeltaY = (state: ChatDebugViewState, deltaY: number): ChatDebugViewState => {
  return {
    ...state,
    previewTextDeltaY: clampPreviewTextDeltaY(deltaY, getPreviewTextLineCount(state.selectedEvent), getPreviewTextViewportHeight(state)),
  }
}
