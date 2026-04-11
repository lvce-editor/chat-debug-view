import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getMenuEntriesTableBody } from '../GetMenuEntriesTableBody/GetMenuEntriesTableBody.ts'
import { getMenuEntriesTableHeader } from '../GetMenuEntriesTableHeader/GetMenuEntriesTableHeader.ts'
import { MenuChatDebugTableHeader } from '../HandleHeaderContextMenu/HandleHeaderContextMenu.ts'
import { MenuChatDebugTableBody } from '../HandleTableBodyContextMenu/HandleTableBodyContextMenu.ts'

export const getMenuEntries2 = (state: ChatDebugViewState, props: ContextMenuProps): readonly MenuEntry[] => {
  if (props.menuId === MenuChatDebugTableHeader) {
    return getMenuEntriesTableHeader(state)
  }
  if (props.menuId === MenuChatDebugTableBody) {
    return getMenuEntriesTableBody(props)
  }
  return []
}
