import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import {
  ChatDebugViewCell,
  ChatDebugViewColumnFixed,
  ChatDebugViewCellDuration,
  ChatDebugViewCellStatus,
  ChatDebugViewCellStatusError,
  ChatDebugViewCellType,
} from '../ClassNames/ClassNames.ts'
import { getEventTableDurationText } from '../GetEventTableDurationText/GetEventTableDurationText.ts'
import { getEventTableTypeLabel } from '../GetEventTableTypeLabel/GetEventTableTypeLabel.ts'
import { getStatusText } from '../GetStatusText/GetStatusText.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getRowCellNodes = (event: ChatViewEvent, isErrorStatus: boolean, visibleTableColumns: readonly string[]): readonly VirtualDomNode[] => {
  const orderedVisibleTableColumns = TableColumn.getOrderedVisibleTableColumns(visibleTableColumns)
  return orderedVisibleTableColumns.flatMap((column, index) => {
    const isFixed = index < orderedVisibleTableColumns.length - 1
    switch (column) {
      case TableColumn.Duration:
        return [
          {
            childCount: 1,
            className: mergeClassNames(ChatDebugViewCell, ChatDebugViewCellDuration, isFixed ? ChatDebugViewColumnFixed : ''),
            type: VirtualDomElements.Td,
          },
          text(getEventTableDurationText(event)),
        ]
      case TableColumn.Status:
        return [
          {
            childCount: 1,
            className: mergeClassNames(
              ChatDebugViewCell,
              ChatDebugViewCellStatus,
              isErrorStatus ? ChatDebugViewCellStatusError : '',
              isFixed ? ChatDebugViewColumnFixed : '',
            ),
            type: VirtualDomElements.Td,
          },
          text(getStatusText(event)),
        ]
      case TableColumn.Type:
        return [
          {
            childCount: 1,
            className: mergeClassNames(ChatDebugViewCell, ChatDebugViewCellType, isFixed ? ChatDebugViewColumnFixed : ''),
            type: VirtualDomElements.Td,
          },
          text(getEventTableTypeLabel(event)),
        ]
      default:
        return []
    }
  })
}
