import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import {
  ChatDebugViewColumnFixed,
  ChatDebugViewHeaderCell,
  ChatDebugViewHeaderCellDuration,
  ChatDebugViewHeaderCellStatus,
  ChatDebugViewHeaderCellType,
} from '../ClassNames/ClassNames.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getHeaderCellNodes = (visibleTableColumns: readonly string[]): readonly VirtualDomNode[] => {
  const orderedVisibleTableColumns = TableColumn.getOrderedVisibleTableColumns(visibleTableColumns)
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
          text(ChatDebugStrings.duration()),
        ]
      case TableColumn.Status:
        return [
          {
            childCount: 1,
            className: mergeClassNames(ChatDebugViewHeaderCell, ChatDebugViewHeaderCellStatus, isFixed ? ChatDebugViewColumnFixed : ''),
            scope: 'col',
            type: VirtualDomElements.Th,
          },
          text(ChatDebugStrings.status()),
        ]
      case TableColumn.Type:
        return [
          {
            childCount: 1,
            className: mergeClassNames(ChatDebugViewHeaderCell, ChatDebugViewHeaderCellType, isFixed ? ChatDebugViewColumnFixed : ''),
            scope: 'col',
            type: VirtualDomElements.Th,
          },
          text(ChatDebugStrings.type()),
        ]
      default:
        return []
    }
  })
}
