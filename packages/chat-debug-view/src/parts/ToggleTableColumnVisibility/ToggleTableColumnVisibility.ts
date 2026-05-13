import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { isTableColumn } from '../TableColumn/TableColumn.ts'

export const toggleTableColumnVisibility = (state: ChatDebugViewState, column: string): ChatDebugViewState => {
  const { tableColumns } = state
  if (!isTableColumn(column)) {
    return state
  }
  return {
    ...state,
    tableColumns: tableColumns.map((tableColumn) => {
      if (tableColumn.name !== column) {
        return tableColumn
      }
      return {
        ...tableColumn,
        isVisible: !tableColumn.isVisible,
      }
    }),
  }
}
