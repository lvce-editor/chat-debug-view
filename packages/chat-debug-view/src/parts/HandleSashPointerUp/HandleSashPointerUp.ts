import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const handleSashPointerUp = (state: ChatDebugViewState, eventX: number, eventY: number): ChatDebugViewState => {
  if (!state.sashPointerActive) {
    return state
  }
  return {
    ...state,
    sashPointerActive: false,
  }
}
