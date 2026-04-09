import { MenuChatDebugTableHeader } from '../HandleHeaderContextMenu/HandleHeaderContextMenu.ts'
import { MenuChatDebugTableBody } from '../HandleTableBodyContextMenu/HandleTableBodyContextMenu.ts'

export const getMenuIds = (): readonly number[] => {
  return [MenuChatDebugTableHeader, MenuChatDebugTableBody, 556, 557]
}
