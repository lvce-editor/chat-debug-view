import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
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
  return visibleTableColumns.flatMap((column, index) => {
    const isFixed = index < visibleTableColumns.length - 1
    const fixedClassName = isFixed ? ` ${ChatDebugViewColumnFixed}` : ''
    switch (column) {
      case TableColumn.Duration:
        return [
          {
            childCount: 1,
            className: `${ChatDebugViewHeaderCell} ${ChatDebugViewHeaderCellDuration}${fixedClassName}`,
            scope: 'col',
            type: VirtualDomElements.Th,
          },
          text(ChatDebugStrings.duration()),
        ]
      case TableColumn.Status:
        return [
          {
            childCount: 1,
            className: `${ChatDebugViewHeaderCell} ${ChatDebugViewHeaderCellStatus}${fixedClassName}`,
            scope: 'col',
            type: VirtualDomElements.Th,
          },
          text(ChatDebugStrings.status()),
        ]
      case TableColumn.Type:
        return [
          {
            childCount: 1,
            className: `${ChatDebugViewHeaderCell} ${ChatDebugViewHeaderCellType}${fixedClassName}`,
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
