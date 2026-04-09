import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as Refresh from '../Refresh/Refresh.ts'

export const handleClickRefreshDependencies = {
  refresh: Refresh.refresh,
}

export const handleClickRefresh = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  return handleClickRefreshDependencies.refresh(state)
}
