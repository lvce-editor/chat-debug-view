import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'

const getColumnMenuEntry = (columnName: string, label: string, isVisible: boolean): MenuEntry => {
  return {
    args: [columnName],
    command: 'ChatDebug.toggleTableColumnVisibility',
    flags: isVisible ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
    id: columnName,
    label,
  }
}

export const getMenuEntriesTableHeader = (state: ChatDebugViewState): readonly MenuEntry[] => {
  return [
    ...state.tableColumns.map((column) => getColumnMenuEntry(column.name, column.label, column.isVisible)),
    {
      args: [],
      command: 'ChatDebug.resetTableColumns',
      flags: MenuItemFlags.None,
      id: 'reset-columns',
      label: ChatDebugStrings.resetColumns(),
    },
  ]
}
