import type { TableColumnWidths } from './TableColumnWidths.ts'
import { clampTableWidth, leftPadding } from '../SplitLayout/SplitLayout.ts'
import { getTableColumnLayout } from './GetTableColumnLayout.ts'
import { minimumTableColumnWidth } from './MinimumTableColumnWidth.ts'

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
  const remainingVisibleColumnCount = layout.visibleColumns.length - boundaryIndex - 1
  const maxWidth = Math.max(minimumTableColumnWidth, clampedTableWidth - precedingWidth - minimumTableColumnWidth * remainingVisibleColumnCount)
  const nextWidth = clientX - viewX - leftPadding - precedingWidth
  const clampedWidth = Math.max(minimumTableColumnWidth, Math.min(nextWidth, maxWidth))
  const resizedColumn = layout.visibleColumns[boundaryIndex]
  return {
    ...tableColumnWidths,
    [resizedColumn]: clampedWidth,
  }
}
