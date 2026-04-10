import type { TableColumnWidths } from './TableColumnWidths.ts'
import { isFiniteNumber } from './IsFiniteNumber.ts'

export const isTableColumnWidths = (value: unknown): value is TableColumnWidths => {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const record = value as Record<string, unknown>
  return isFiniteNumber(record.type) && isFiniteNumber(record.duration) && isFiniteNumber(record.status)
}
