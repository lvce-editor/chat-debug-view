import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { refresh } from '../Refresh/Refresh.ts'

export const handleClickRefresh = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  return refresh(state)
}
