import type { TableColumnWidths } from './TableColumnWidths.ts'

export const isSameTableColumnWidths = (first: TableColumnWidths, second: TableColumnWidths): boolean => {
  return first.type === second.type && first.duration === second.duration && first.status === second.status
}
