import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { defaultVisibleTableColumns, getVisibleTableColumns, createTableColumns } from '../TableColumn/TableColumn.ts'
import { defaultTableColumnWidths, isSameTableColumnWidths } from '../TableColumnLayout/TableColumnLayout.ts'

export const resetTableColumns = (state: ChatDebugViewState): ChatDebugViewState => {
  if (
    getVisibleTableColumns(state.tableColumns).join(',') === defaultVisibleTableColumns.join(',') &&
    isSameTableColumnWidths(state.tableColumnWidths, defaultTableColumnWidths)
  ) {
    return state
  }
  return {
    ...state,
    tableColumnWidths: defaultTableColumnWidths,
    tableColumns: createTableColumns(),
  }
}
