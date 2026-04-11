import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventTableColumnValue } from '../GetEventTableColumnValue/GetEventTableColumnValue.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

const compareValues = (a: string, b: string, descending: boolean): number => {
  const result = a.localeCompare(b, undefined, { sensitivity: 'base' })
  return descending ? -result : result
}

export const sortEventsByTableColumn = (
  events: readonly ChatViewEvent[],
  sortColumn: TableColumn.TableColumnName | '',
  sortDescending: boolean,
): readonly ChatViewEvent[] => {
  if (!sortColumn || !TableColumn.isTableColumn(sortColumn)) {
    return events
  }
  return events
    .map((event, index) => ({
      event,
      index,
      value: getEventTableColumnValue(event, sortColumn),
    }))
    .sort((a, b) => {
      const compared = compareValues(a.value, b.value, sortDescending)
      if (compared !== 0) {
        return compared
      }
      return a.index - b.index
    })
    .map((item) => item.event)
}
