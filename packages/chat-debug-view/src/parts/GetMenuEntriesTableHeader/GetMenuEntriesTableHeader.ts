import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import * as GetColumnVisibilityFlags from '../GetColumnVisibilityFlags/GetColumnVisibilityFlags.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getMenuEntriesTableHeader = (state: ChatDebugViewState): readonly MenuEntry[] => {
  return [
    {
      args: [TableColumn.Type],
      command: 'ChatDebug.toggleTableColumnVisibility',
      flags: GetColumnVisibilityFlags.getColumnVisibilityFlags(state.tableColumns, TableColumn.Type),
      id: 'type',
      label: ChatDebugStrings.type(),
    },
    {
      args: [TableColumn.Status],
      command: 'ChatDebug.toggleTableColumnVisibility',
      flags: GetColumnVisibilityFlags.getColumnVisibilityFlags(state.tableColumns, TableColumn.Status),
      id: 'status',
      label: ChatDebugStrings.status(),
    },
    {
      args: [TableColumn.Duration],
      command: 'ChatDebug.toggleTableColumnVisibility',
      flags: GetColumnVisibilityFlags.getColumnVisibilityFlags(state.tableColumns, TableColumn.Duration),
      id: 'duration',
      label: ChatDebugStrings.duration(),
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
