import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getOrderedVisibleTableColumns, isTableColumn } from '../TableColumn/TableColumn.ts'

export const toggleTableColumnVisibility = (state: ChatDebugViewState, column: string): ChatDebugViewState => {
  if (!isTableColumn(column)) {
    return state
  }
  const nextVisibleColumns = state.visibleTableColumns.includes(column)
    ? state.visibleTableColumns.filter((visibleColumn) => visibleColumn !== column)
    : [...state.visibleTableColumns, column]
  return {
    ...state,
    visibleTableColumns: getOrderedVisibleTableColumns(nextVisibleColumns),
  }
}
