import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { defaultVisibleTableColumns, getVisibleTableColumns, createTableColumns } from '../TableColumn/TableColumn.ts'
import { defaultTableColumnWidths, isSameTableColumnWidths } from '../TableColumnLayout/TableColumnLayout.ts'

export const resetTableColumns = (state: ChatDebugViewState): ChatDebugViewState => {
  const { sortColumn, sortDescending, tableColumns, tableColumnWidths } = state
  if (
    getVisibleTableColumns(tableColumns).join(',') === defaultVisibleTableColumns.join(',') &&
    isSameTableColumnWidths(tableColumnWidths, defaultTableColumnWidths) &&
    sortColumn === '' &&
    sortDescending === false
  ) {
    return state
  }
  return {
    ...state,
    sortColumn: '',
    sortDescending: false,
    tableColumns: createTableColumns(),
    tableColumnWidths: defaultTableColumnWidths,
  }
}
