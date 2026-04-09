import { MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { MenuChatDebugTableBody } from '../HandleTableBodyContextMenu/HandleTableBodyContextMenu.ts'

export const getMenuEntries2 = (state: ChatDebugViewState, props: ContextMenuProps): readonly MenuEntry[] => {
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
