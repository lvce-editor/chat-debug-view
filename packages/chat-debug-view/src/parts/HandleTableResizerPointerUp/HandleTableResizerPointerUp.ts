import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const handleTableResizerPointerUp = (state: ChatDebugViewState): ChatDebugViewState => {
  if (!state.tableResizerDownId) {
    return state
  }
  return {
    ...state,
    tableResizerDownId: 0,
  }
}
