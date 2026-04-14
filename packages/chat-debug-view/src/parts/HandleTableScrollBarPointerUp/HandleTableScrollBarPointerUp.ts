import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const handleTableScrollBarPointerUp = (state: ChatDebugViewState): ChatDebugViewState => {
  if (!state.tableScrollBarPointerActive && state.tableScrollBarHandleOffset === 0) {
    return state
  }
  return {
    ...state,
    tableScrollBarHandleOffset: 0,
    tableScrollBarPointerActive: false,
  }
}
