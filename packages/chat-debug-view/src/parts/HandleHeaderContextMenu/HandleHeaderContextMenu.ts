import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const MenuChatDebugTableHeader = 2189

export const handleHeaderContextMenu = async (state: ChatDebugViewState, eventX: number, eventY: number): Promise<ChatDebugViewState> => {
  const { uid } = state
  await RendererWorker.showContextMenu2(uid, MenuChatDebugTableHeader, eventX, eventY, {
    menuId: MenuChatDebugTableHeader,
  })
  return state
}
