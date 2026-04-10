import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

export const focusFirst = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  return focusIndex(state, 0)
}
