import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getTableBodyEventIndex } from '../GetTableBodyEventIndex/GetTableBodyEventIndex.ts'

export const MenuChatDebugTableBody = 2190

export const handleTableBodyContextMenu = async (state: ChatDebugViewState, eventX: number, eventY: number): Promise<ChatDebugViewState> => {
  const eventIndex = getTableBodyEventIndex(state, eventX, eventY)
  await RendererWorker.showContextMenu2(state.uid, MenuChatDebugTableBody, eventX, eventY, {
    eventIndex,
    menuId: MenuChatDebugTableBody,
  })
  return state
}
