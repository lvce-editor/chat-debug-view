import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getTableBodyY } from '../GetTableBodyY/GetTableBodyY.ts'

export const getPreviewTextBodyY = (state: ChatDebugViewState): number => {
  return getTableBodyY(state, true)
}
