import { clampTableWidth, leftPadding } from '../SplitLayout/SplitLayout.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export interface TableColumnWidths {
  readonly duration: number
  readonly status: number
  readonly type: number
}

export const defaultTableColumnWidths: TableColumnWidths = {
  duration: 110,
  status: 110,
  type: 260,
}

export const minimumTableColumnWidth = 80

const isFiniteNumber = (value: unknown): value is number => {
  return typeof value === 'number' && Number.isFinite(value)
}

export const isTableColumnWidths = (value: unknown): value is TableColumnWidths => {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const record = value as Record<string, unknown>
  return isFiniteNumber(record.type) && isFiniteNumber(record.duration) && isFiniteNumber(record.status)
}

export interface TableColumnLayout {
  readonly fixedColumns: readonly TableColumn.TableColumn[]
  readonly resizerLefts: readonly number[]
  readonly visibleColumns: readonly TableColumn.TableColumn[]
  readonly visibleColumnWidths: readonly number[]
}

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
    const maxWidth = Math.max(minimumTableColumnWidth, remainingWidth - minimumTableColumnWidth * (remainingColumnCount - 1))
    const preferredWidth = tableColumnWidths[column]
    const clampedWidth = Math.max(minimumTableColumnWidth, Math.min(preferredWidth, maxWidth))
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

export const isSameTableColumnWidths = (first: TableColumnWidths, second: TableColumnWidths): boolean => {
  return first.type === second.type && first.duration === second.duration && first.status === second.status
}
