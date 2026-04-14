import type { ResizeDimensions } from '../ResizeDimensions/ResizeDimensions.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clampTableWidth } from '../SplitLayout/SplitLayout.ts'
import { applyVirtualTableState } from '../VirtualTable/VirtualTable.ts'

export const handleResize = (state: ChatDebugViewState, dimensions: ResizeDimensions): ChatDebugViewState => {
  const nextState = {
    ...state,
    ...dimensions,
  }
  return applyVirtualTableState({
    ...nextState,
    tableWidth: clampTableWidth(nextState.width, state.tableWidth),
  })
}
