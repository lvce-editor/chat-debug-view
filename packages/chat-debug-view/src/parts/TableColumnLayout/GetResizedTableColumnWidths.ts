import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clampTableWidth } from '../SplitLayout/SplitLayout.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'
import { getTableColumnLayout } from './GetTableColumnLayout.ts'

export const getResizedTableColumnWidths = (
  state: ChatDebugViewState,
  visibleTableColumns: readonly string[],
  tableColumns: readonly TableColumn.TableColumn[],
  clientX: number,
  resizerDownId: number,
): readonly TableColumn.TableColumn[] => {
  const clampedTableWidth = clampTableWidth(state, state.tableWidth)
  const layout = getTableColumnLayout(clampedTableWidth, visibleTableColumns, tableColumns)
  if (resizerDownId < 1 || resizerDownId >= layout.visibleColumns.length) {
    return tableColumns
  }
  const boundaryIndex = resizerDownId - 1
  const precedingWidth = layout.visibleColumnWidths.slice(0, boundaryIndex).reduce((total, current) => total + current, 0)
  const resizedColumn = layout.visibleColumns[boundaryIndex]
  const minimumWidth = TableColumn.getTableColumnMinimumWidth(tableColumns, resizedColumn)
  const minimumRemainingWidth = layout.visibleColumns
    .slice(boundaryIndex + 1)
    .reduce((total, column) => total + TableColumn.getTableColumnMinimumWidth(tableColumns, column), 0)
  const maxWidth = Math.max(minimumWidth, clampedTableWidth - precedingWidth - minimumRemainingWidth)
  const nextWidth = clientX - state.x - state.leftPadding - precedingWidth
  const clampedWidth = Math.max(minimumWidth, Math.min(nextWidth, maxWidth))
  return TableColumn.setTableColumnWidth(tableColumns, resizedColumn, clampedWidth)
}
