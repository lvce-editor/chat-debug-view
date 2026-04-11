import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewHeaderCell } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getHeaderCellNodes = (
  visibleTableColumns: readonly string[],
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
): readonly VirtualDomNode[] => {
  const orderedVisibleTableColumns = TableColumn.getOrderedVisibleTableColumns(visibleTableColumns, tableColumns)
  return orderedVisibleTableColumns.flatMap((column) => {
    switch (column) {
      case TableColumn.Duration:
        return [
          {
            childCount: 1,
            className: ChatDebugViewHeaderCell,
            name: column,
            onClick: DomEventListenerFunctions.HandleTableHeaderClick,
            type: VirtualDomElements.Th,
          },
          text(TableColumn.getTableColumnLabel(tableColumns, column)),
        ]
      case TableColumn.Status:
        return [
          {
            childCount: 1,
            className: ChatDebugViewHeaderCell,
            name: column,
            onClick: DomEventListenerFunctions.HandleTableHeaderClick,
            type: VirtualDomElements.Th,
          },
          text(TableColumn.getTableColumnLabel(tableColumns, column)),
        ]
      case TableColumn.Type:
        return [
          {
            childCount: 1,
            className: ChatDebugViewHeaderCell,
            name: column,
            onClick: DomEventListenerFunctions.HandleTableHeaderClick,
            type: VirtualDomElements.Th,
          },
          text(TableColumn.getTableColumnLabel(tableColumns, column)),
        ]
      default:
        return []
    }
  })
}
