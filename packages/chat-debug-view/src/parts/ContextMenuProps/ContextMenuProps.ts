import type { MenuChatDebugTableBody } from '../HandleTableBodyContextMenu/HandleTableBodyContextMenu.ts'

export interface ContextMenuPropsBase {
  readonly menuId: number
}

export interface ContextMenuPropsTableRow extends ContextMenuPropsBase {
  readonly menuId: typeof MenuChatDebugTableBody
}

export type ContextMenuProps = ContextMenuPropsTableRow
