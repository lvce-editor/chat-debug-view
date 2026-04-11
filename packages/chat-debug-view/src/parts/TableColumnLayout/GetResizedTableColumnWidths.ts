import type { TableColumnWidths } from './TableColumnWidths.ts'
import { clampTableWidth, leftPadding } from '../SplitLayout/SplitLayout.ts'
import { getTableColumnLayout } from './GetTableColumnLayout.ts'
import { getMinimumTableColumnWidth } from './MinimumTableColumnWidth.ts'

export const getResizedTableColumnWidths = (
  width: number,
  tableWidth: number,
  visibleTableColumns: readonly string[],
  tableColumnWidths: TableColumnWidths,
  viewX: number,
  clientX: number,
  resizerDownId: number,
): TableColumnWidths => {
  const clampedTableWidth = clampTableWidth(width, tableWidth)
  const layout = getTableColumnLayout(clampedTableWidth, visibleTableColumns, tableColumnWidths)
  if (resizerDownId < 1 || resizerDownId >= layout.visibleColumns.length) {
    return tableColumnWidths
  }
  const boundaryIndex = resizerDownId - 1
  const precedingWidth = layout.visibleColumnWidths.slice(0, boundaryIndex).reduce((total, current) => total + current, 0)
  const resizedColumn = layout.visibleColumns[boundaryIndex]
  const minimumWidth = getMinimumTableColumnWidth(resizedColumn)
  const minimumRemainingWidth = layout.visibleColumns
    .slice(boundaryIndex + 1)
    .reduce((total, column) => total + getMinimumTableColumnWidth(column), 0)
  const maxWidth = Math.max(minimumWidth, clampedTableWidth - precedingWidth - minimumRemainingWidth)
  const nextWidth = clientX - viewX - leftPadding - precedingWidth
  const clampedWidth = Math.max(minimumWidth, Math.min(nextWidth, maxWidth))
  return {
    ...tableColumnWidths,
    [resizedColumn]: clampedWidth,
  }
}
