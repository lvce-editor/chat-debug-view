import type { ResizeDimensions } from '../ResizeDimensions/ResizeDimensions.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clampTableWidth, getBalancedSplitTableWidth, shouldUseBalancedSplitTableWidth } from '../SplitLayout/SplitLayout.ts'
import { applyVirtualTableState } from '../VirtualTable/VirtualTable.ts'

export const handleResize = (state: ChatDebugViewState, dimensions: ResizeDimensions): ChatDebugViewState => {
  const nextState = {
    ...state,
    ...dimensions,
  }
  const tableWidth = shouldUseBalancedSplitTableWidth(nextState)
    ? getBalancedSplitTableWidth(nextState)
    : clampTableWidth(nextState, state.tableWidth)
  return applyVirtualTableState({
    ...nextState,
    tableWidth,
  })
}
