import type { TableColumnName } from '../TableColumn/TableColumn.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const minimumTableColumnWidth = 80

const minimumTableColumnWidths: Record<TableColumnName, number> = {
  [TableColumn.Duration]: 80,
  [TableColumn.Status]: 56,
  [TableColumn.Type]: 80,
}

export const getMinimumTableColumnWidth = (column: TableColumnName): number => {
  return minimumTableColumnWidths[column]
}
