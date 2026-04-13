import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { isTableColumn } from '../TableColumn/TableColumn.ts'

export const toggleTableColumnVisibility = (state: ChatDebugViewState, column: string): ChatDebugViewState => {
  if (!isTableColumn(column)) {
    return state
  }
  return {
    ...state,
    tableColumns: state.tableColumns.map((tableColumn) => {
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
