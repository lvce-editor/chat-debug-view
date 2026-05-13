import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { createTableColumns, defaultVisibleTableColumns, getTableColumnWidths, getVisibleTableColumns } from '../TableColumn/TableColumn.ts'
import { isSameTableColumnWidths } from '../TableColumnLayout/TableColumnLayout.ts'

export const resetTableColumns = (state: ChatDebugViewState): ChatDebugViewState => {
  const { sortColumn, sortDescending, tableColumns } = state
  const defaultTableColumns = createTableColumns()
  if (
    getVisibleTableColumns(tableColumns).join(',') === defaultVisibleTableColumns.join(',') &&
    isSameTableColumnWidths(getTableColumnWidths(tableColumns), getTableColumnWidths(defaultTableColumns)) &&
    sortColumn === '' &&
    sortDescending === false
  ) {
    return state
  }
  return {
    ...state,
    sortColumn: '',
    sortDescending: false,
    tableColumns: defaultTableColumns,
  }
}
