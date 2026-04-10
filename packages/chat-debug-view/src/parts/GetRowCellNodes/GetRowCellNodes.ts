import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import {
  ChatDebugViewCell,
  ChatDebugViewCellDuration,
  ChatDebugViewCellStatus,
  ChatDebugViewCellStatusError,
  ChatDebugViewCellType,
} from '../ClassNames/ClassNames.ts'
import { getDurationText } from '../GetDurationText/GetDurationText.ts'
import { getEventTypeLabel } from '../GetEventTypeLabel/GetEventTypeLabel.ts'
import { getStatusText } from '../GetStatusText/GetStatusText.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getRowCellNodes = (event: ChatViewEvent, isErrorStatus: boolean, visibleTableColumns: readonly string[]): readonly VirtualDomNode[] => {
  return visibleTableColumns.flatMap((column) => {
    switch (column) {
      case TableColumn.Duration:
        return [
          {
            childCount: 1,
            className: mergeClassNames(ChatDebugViewCell, ChatDebugViewCellDuration),
            type: VirtualDomElements.Td,
          },
          text(getDurationText(event)),
        ]
      case TableColumn.Status:
        return [
          {
            childCount: 1,
            className: mergeClassNames(ChatDebugViewCell, ChatDebugViewCellStatus, isErrorStatus ? ChatDebugViewCellStatusError : ''),
            type: VirtualDomElements.Td,
          },
          text(getStatusText(event)),
        ]
      case TableColumn.Type:
        return [
          {
            childCount: 1,
            className: mergeClassNames(ChatDebugViewCell, ChatDebugViewCellType),
            type: VirtualDomElements.Td,
          },
          text(getEventTypeLabel(event)),
        ]
      default:
        return []
    }
  })
}
