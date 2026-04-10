import type { MenuChatDebugTableHeader } from '../HandleHeaderContextMenu/HandleHeaderContextMenu.ts'
import type { MenuChatDebugTableBody } from '../HandleTableBodyContextMenu/HandleTableBodyContextMenu.ts'

export interface ContextMenuPropsBase {
  readonly menuId: number
}

export interface ContextMenuPropsTableHeader extends ContextMenuPropsBase {
  readonly menuId: typeof MenuChatDebugTableHeader
}

export interface ContextMenuPropsTableRow extends ContextMenuPropsBase {
  readonly eventIndex: number
  readonly menuId: typeof MenuChatDebugTableBody
}

export type ContextMenuProps = ContextMenuPropsTableHeader | ContextMenuPropsTableRow
