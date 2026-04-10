import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { isSameVisibleTableColumns } from '../IsSameVisibleTableColumns/IsSameVisibleTableColumns.ts'
import { defaultVisibleTableColumns } from '../TableColumn/TableColumn.ts'
import { defaultTableColumnWidths, isSameTableColumnWidths } from '../TableColumnLayout/TableColumnLayout.ts'

export const resetTableColumns = (state: ChatDebugViewState): ChatDebugViewState => {
  if (
    isSameVisibleTableColumns(state.visibleTableColumns, defaultVisibleTableColumns) &&
    isSameTableColumnWidths(state.tableColumnWidths, defaultTableColumnWidths)
  ) {
    return state
  }
  return {
    ...state,
    tableColumnWidths: defaultTableColumnWidths,
    visibleTableColumns: defaultVisibleTableColumns,
  }
}
