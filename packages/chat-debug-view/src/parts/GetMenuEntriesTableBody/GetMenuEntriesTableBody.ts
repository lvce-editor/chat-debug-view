import { MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuPropsTableRow } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'

export const getMenuEntriesTableBody = (props: ContextMenuPropsTableRow): readonly MenuEntry[] => {
  return [
    {
      args: [props.eventIndex],
      command: 'ChatDebug.handleTableRowCopy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: ChatDebugStrings.copy(),
    },
  ]
}
