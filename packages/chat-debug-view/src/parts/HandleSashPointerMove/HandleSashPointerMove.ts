import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getTableWidthFromClientX } from '../SplitLayout/SplitLayout.ts'

export const handleSashPointerMove = (state: ChatDebugViewState, eventX: number, eventY: number): ChatDebugViewState => {
  if (!state.sashPointerActive) {
    return state
  }
  return {
    ...state,
    tableWidth: getTableWidthFromClientX(state.x, state.width, eventX),
  }
}
