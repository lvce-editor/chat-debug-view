import { getTableWidthFromClientX } from '../SplitLayout/SplitLayout.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const handleSashPointerMove = (state: ChatDebugViewState, eventX: number, eventY: number): ChatDebugViewState => {
  return {
    ...state,
    tableWidth: getTableWidthFromClientX(state.x, state.width, eventX),
  }
}
