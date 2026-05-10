import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as GetCellDurationDom from '../GetCellDurationDom/GetCellDurationDom.ts'
import * as GetCellMethodDom from '../GetCellMethodDom/GetCellMethodDom.ts'
import * as GetCellStatusDom from '../GetCellStatusDom/GetCellStatusDom.ts'
import * as GetCellTypeDom from '../GetCellTypeDom/GetCellTypeDom.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

const getTableCellDom = (column: TableColumn.TableColumnName, event: ChatViewEvent, isErrorStatus: boolean): readonly VirtualDomNode[] => {
  switch (column) {
    case TableColumn.Duration:
      return GetCellDurationDom.getCellDurationDom(event)
    case TableColumn.Method:
      return GetCellMethodDom.getCellMethodDom(event)
    case TableColumn.Status:
      return GetCellStatusDom.getCellStatusDom(event, isErrorStatus)
    case TableColumn.Type:
      return GetCellTypeDom.getCellTypeDom(event)
    default:
      return []
  }
}

export const getRowCellNodes = (event: ChatViewEvent, isErrorStatus: boolean, visibleTableColumns: readonly string[]): readonly VirtualDomNode[] => {
  const orderedVisibleTableColumns = TableColumn.getOrderedVisibleTableColumns(visibleTableColumns)
  return orderedVisibleTableColumns.flatMap((column) => {
    return getTableCellDom(column, event, isErrorStatus)
  })
}
