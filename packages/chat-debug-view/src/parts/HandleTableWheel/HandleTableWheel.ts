import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { setTableDeltaY } from '../VirtualTable/VirtualTable.ts'

export const handleTableWheel = (state: ChatDebugViewState, deltaY: number): ChatDebugViewState => {
  return setTableDeltaY(state, state.tableDeltaY + deltaY)
}
