import { MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import * as GetColumnVisibilityFlags from '../GetColumnVisibilityFlags/GetColumnVisibilityFlags.ts'
import { MenuChatDebugTableHeader } from '../HandleHeaderContextMenu/HandleHeaderContextMenu.ts'
import { MenuChatDebugTableBody } from '../HandleTableBodyContextMenu/HandleTableBodyContextMenu.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getMenuEntries2 = (state: ChatDebugViewState, props: ContextMenuProps): readonly MenuEntry[] => {
  if (props.menuId === MenuChatDebugTableHeader) {
    return [
      {
        args: [TableColumn.Type],
        command: 'ChatDebug.toggleTableColumnVisibility',
        flags: GetColumnVisibilityFlags.getColumnVisibilityFlags(state, TableColumn.Type),
        id: 'type',
        label: ChatDebugStrings.type(),
      },
      {
        args: [TableColumn.Duration],
        command: 'ChatDebug.toggleTableColumnVisibility',
        flags: GetColumnVisibilityFlags.getColumnVisibilityFlags(state, TableColumn.Duration),
        id: 'duration',
        label: ChatDebugStrings.duration(),
      },
      {
        args: [TableColumn.Status],
        command: 'ChatDebug.toggleTableColumnVisibility',
        flags: GetColumnVisibilityFlags.getColumnVisibilityFlags(state, TableColumn.Status),
        id: 'status',
        label: ChatDebugStrings.status(),
      },
      {
        args: [],
        command: 'ChatDebug.resetTableColumns',
        flags: MenuItemFlags.None,
        id: 'reset-columns',
        label: ChatDebugStrings.resetColumns(),
      },
    ]
  }
  if (props.menuId === MenuChatDebugTableBody) {
    return [
      {
        args: [],
        command: 'ChatDebug.copy',
        flags: MenuItemFlags.None,
        id: 'copy',
        label: ChatDebugStrings.copy(),
      },
    ]
  }
  return []
}
