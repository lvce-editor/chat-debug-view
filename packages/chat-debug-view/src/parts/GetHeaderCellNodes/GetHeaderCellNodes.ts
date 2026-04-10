import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import {
  ChatDebugViewColumnFixed,
  ChatDebugViewHeaderCell,
  ChatDebugViewHeaderCellDuration,
  ChatDebugViewHeaderCellStatus,
  ChatDebugViewHeaderCellType,
} from '../ClassNames/ClassNames.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getHeaderCellNodes = (
  visibleTableColumns: readonly string[],
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
): readonly VirtualDomNode[] => {
  const orderedVisibleTableColumns = TableColumn.getOrderedVisibleTableColumns(visibleTableColumns, tableColumns)
  return orderedVisibleTableColumns.flatMap((column, index) => {
    const isFixed = index < orderedVisibleTableColumns.length - 1
    switch (column) {
      case TableColumn.Duration:
        return [
          {
            childCount: 1,
            className: mergeClassNames(ChatDebugViewHeaderCell, ChatDebugViewHeaderCellDuration, isFixed ? ChatDebugViewColumnFixed : ''),
            scope: 'col',
            type: VirtualDomElements.Th,
          },
          text(TableColumn.getTableColumnLabel(tableColumns, column)),
        ]
      case TableColumn.Status:
        return [
          {
            childCount: 1,
            className: mergeClassNames(ChatDebugViewHeaderCell, ChatDebugViewHeaderCellStatus, isFixed ? ChatDebugViewColumnFixed : ''),
            scope: 'col',
            type: VirtualDomElements.Th,
          },
          text(TableColumn.getTableColumnLabel(tableColumns, column)),
        ]
      case TableColumn.Type:
        return [
          {
            childCount: 1,
            className: mergeClassNames(ChatDebugViewHeaderCell, ChatDebugViewHeaderCellType, isFixed ? ChatDebugViewColumnFixed : ''),
            scope: 'col',
            type: VirtualDomElements.Th,
          },
          text(TableColumn.getTableColumnLabel(tableColumns, column)),
        ]
      default:
        return []
    }
  })
}
