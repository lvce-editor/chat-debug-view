import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventTableDurationText } from '../GetEventTableDurationText/GetEventTableDurationText.ts'
import { getEventTableTypeLabel } from '../GetEventTableTypeLabel/GetEventTableTypeLabel.ts'
import { getStatusText } from '../GetStatusText/GetStatusText.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

const getSizeSortValue = (event: ChatViewEvent): string => {
  const rawSize = event.size
  if (typeof rawSize !== 'number' || !Number.isFinite(rawSize)) {
    return '0000000000000000'
  }
  return String(Math.max(0, Math.trunc(rawSize))).padStart(16, '0')
}

export const getEventTableColumnValue = (event: ChatViewEvent, column: TableColumn.TableColumnName): string => {
  switch (column) {
    case TableColumn.Duration:
      return getEventTableDurationText(event)
    case TableColumn.Size:
      return getSizeSortValue(event)
    case TableColumn.Status:
      return getStatusText(event)
    case TableColumn.Type:
      return getEventTableTypeLabel(event)
    default:
      return ''
  }
}
