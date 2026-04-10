import type { ResizeDimensions } from '../ResizeDimensions/ResizeDimensions.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { handleResize } from '../HandleResize/HandleResize.ts'

const isResizeDimensions = (value: unknown): value is ResizeDimensions => {
  return typeof value === 'object' && value !== null
}

export const resize = (state: ChatDebugViewState, dimensions: unknown): ChatDebugViewState => {
  if (!isResizeDimensions(dimensions)) {
    return state
  }
  return handleResize(state, dimensions)
}
