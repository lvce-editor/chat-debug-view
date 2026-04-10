import type { ResizeDimensions } from '../ResizeDimensions/ResizeDimensions.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clampTableWidth } from '../SplitLayout/SplitLayout.ts'

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
