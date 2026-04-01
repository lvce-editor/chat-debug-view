import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clampTableWidth } from '../SplitLayout/SplitLayout.ts'

export interface ResizeDimensions {
  readonly height?: number
  readonly width?: number
  readonly x?: number
  readonly y?: number
}

export const handleResize = (state: ChatDebugViewState, dimensions: ResizeDimensions): ChatDebugViewState => {
  const nextState = {
    ...state,
    ...dimensions,
  }
  return {
    ...nextState,
    tableWidth: clampTableWidth(nextState.width, state.tableWidth),
  }
}
