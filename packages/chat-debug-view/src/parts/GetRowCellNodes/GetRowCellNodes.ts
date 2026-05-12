import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as GetTableCellDom from '../GetTableCellDom/GetTableCellDom.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getRowCellNodes = (event: ChatViewEvent, isErrorStatus: boolean, visibleTableColumns: readonly string[]): readonly VirtualDomNode[] => {
  const orderedVisibleTableColumns = TableColumn.getOrderedVisibleTableColumns(visibleTableColumns)
  return orderedVisibleTableColumns.flatMap((column) => {
    return GetTableCellDom.getTableCellDom(column, event, isErrorStatus)
  })
}
