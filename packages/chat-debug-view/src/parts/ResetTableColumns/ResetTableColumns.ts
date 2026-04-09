import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { defaultVisibleTableColumns } from '../TableColumn/TableColumn.ts'

const isSameVisibleTableColumns = (a: readonly string[], b: readonly string[]): boolean => {
  return a.length === b.length && a.every((value, index) => value === b[index])
}

export const resetTableColumns = (state: ChatDebugViewState): ChatDebugViewState => {
  if (isSameVisibleTableColumns(state.visibleTableColumns, defaultVisibleTableColumns)) {
    return state
  }
  return {
    ...state,
    visibleTableColumns: defaultVisibleTableColumns,
  }
}
