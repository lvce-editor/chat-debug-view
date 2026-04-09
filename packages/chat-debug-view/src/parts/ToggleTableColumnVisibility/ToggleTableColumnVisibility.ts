import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getOrderedVisibleTableColumns, isTableColumn } from '../TableColumn/TableColumn.ts'

export const toggleTableColumnVisibility = (state: ChatDebugViewState, column: string): ChatDebugViewState => {
  if (!isTableColumn(column)) {
    return state
  }
  const nextVisibleColumns = new Set(state.visibleTableColumns)
  if (nextVisibleColumns.has(column)) {
    nextVisibleColumns.delete(column)
  } else {
    nextVisibleColumns.add(column)
  }
  return {
    ...state,
    visibleTableColumns: getOrderedVisibleTableColumns([...nextVisibleColumns]),
  }
}
