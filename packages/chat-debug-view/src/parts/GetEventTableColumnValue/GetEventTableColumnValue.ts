import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getDurationText } from '../GetDurationText/GetDurationText.ts'
import { getEventTypeLabel } from '../GetEventTypeLabel/GetEventTypeLabel.ts'
import { getStatusText } from '../GetStatusText/GetStatusText.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getEventTableColumnValue = (event: ChatViewEvent, column: TableColumn.TableColumnName): string => {
  switch (column) {
    case TableColumn.Duration:
      return getDurationText(event)
    case TableColumn.Status:
      return getStatusText(event)
    case TableColumn.Type:
      return getEventTypeLabel(event)
    default:
      return ''
  }
}
