import type { TableColumnLayout } from './TableColumnLayoutType.ts'
import type { TableColumnWidths } from './TableColumnWidths.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'
import { getMinimumTableColumnWidth } from './MinimumTableColumnWidth.ts'

export const getTableColumnLayout = (
  tableWidth: number,
  visibleTableColumns: readonly string[],
  tableColumnWidths: TableColumnWidths,
): TableColumnLayout => {
  const visibleColumns = TableColumn.getOrderedVisibleTableColumns(visibleTableColumns)
  if (visibleColumns.length === 0) {
    return {
      fixedColumns: [],
      resizerLefts: [],
      visibleColumns,
      visibleColumnWidths: [],
    }
  }
  const visibleColumnWidths: number[] = []
  let remainingWidth = tableWidth
  let remainingColumnCount = visibleColumns.length
  for (let index = 0; index < visibleColumns.length; index++) {
    const column = visibleColumns[index]
    if (index === visibleColumns.length - 1) {
      visibleColumnWidths.push(Math.max(0, remainingWidth))
      continue
    }
    const minimumWidth = getMinimumTableColumnWidth(column)
    const minimumRemainingWidth = visibleColumns
      .slice(index + 1)
      .reduce((total, remainingColumn) => total + getMinimumTableColumnWidth(remainingColumn), 0)
    const maxWidth = Math.max(minimumWidth, remainingWidth - minimumRemainingWidth)
    const preferredWidth = tableColumnWidths[column]
    const clampedWidth = Math.max(minimumWidth, Math.min(preferredWidth, maxWidth))
    visibleColumnWidths.push(clampedWidth)
    remainingWidth -= clampedWidth
    remainingColumnCount -= 1
  }
  const resizerLefts: number[] = []
  let cumulativeWidth = 0
  for (let index = 0; index < visibleColumnWidths.length - 1; index++) {
    cumulativeWidth += visibleColumnWidths[index]
    resizerLefts.push(cumulativeWidth)
  }
  return {
    fixedColumns: visibleColumns.slice(0, -1),
    resizerLefts,
    visibleColumns,
    visibleColumnWidths,
  }
}
