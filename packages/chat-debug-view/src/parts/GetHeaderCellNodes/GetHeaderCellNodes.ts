import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugViewHeaderCell } from '../ClassNames/ClassNames.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getHeaderCellNodes = (visibleTableColumns: readonly string[]): readonly VirtualDomNode[] => {
  return visibleTableColumns.flatMap((column) => {
    switch (column) {
      case TableColumn.Duration:
        return [
          {
            childCount: 1,
            className: ChatDebugViewHeaderCell,
            scope: 'col',
            type: VirtualDomElements.Th,
          },
          text(ChatDebugStrings.duration()),
        ]
      case TableColumn.Status:
        return [
          {
            childCount: 1,
            className: ChatDebugViewHeaderCell,
            scope: 'col',
            type: VirtualDomElements.Th,
          },
          text(ChatDebugStrings.status()),
        ]
      case TableColumn.Type:
        return [
          {
            childCount: 1,
            className: ChatDebugViewHeaderCell,
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