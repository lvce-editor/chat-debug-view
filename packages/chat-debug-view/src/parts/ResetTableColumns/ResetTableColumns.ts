import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { isSameVisibleTableColumns } from '../IsSameVisibleTableColumns/IsSameVisibleTableColumns.ts'
import { defaultVisibleTableColumns } from '../TableColumn/TableColumn.ts'

export const resetTableColumns = (state: ChatDebugViewState): ChatDebugViewState => {
  if (isSameVisibleTableColumns(state.visibleTableColumns, defaultVisibleTableColumns)) {
    return state
  }
  return {
    ...state,
    visibleTableColumns: defaultVisibleTableColumns,
  }
}
