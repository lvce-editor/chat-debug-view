import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import {
  ChatDebugViewCell,
  ChatDebugViewCellDuration,
  ChatDebugViewCellStatus,
  ChatDebugViewCellStatusError,
  ChatDebugViewCellType,
  ChatDebugViewEventRow,
  ChatDebugViewEventRowSelected,
  TableRowEven,
  joinClassNames,
} from '../ClassNames/ClassNames.ts'
import { getDurationText } from '../GetDurationText/GetDurationText.ts'
import { getEventTypeLabel } from '../GetEventTypeLabel/GetEventTypeLabel.ts'
import { getStatusText } from '../GetStatusText/GetStatusText.ts'
import { hasErrorStatus } from '../HasErrorStatus/HasErrorStatus.ts'

export const getDevtoolsRows = (events: readonly ChatViewEvent[], selectedEventIndex: number | null): readonly VirtualDomNode[] => {
  return events.flatMap((event, i) => {
    const isEvenRow = i % 2 === 1
    const isSelected = selectedEventIndex === i
    const isErrorStatus = hasErrorStatus(event)
    const rowIndex = String(i)
    return [
      {
        childCount: 3,
        className: joinClassNames(ChatDebugViewEventRow, isEvenRow && TableRowEven, isSelected && ChatDebugViewEventRowSelected),
        'data-index': rowIndex,
        type: VirtualDomElements.Tr,
      },
      {
        childCount: 1,
        className: joinClassNames(ChatDebugViewCell, ChatDebugViewCellType),
        type: VirtualDomElements.Td,
      },
      text(getEventTypeLabel(event)),
      {
        childCount: 1,
        className: joinClassNames(ChatDebugViewCell, ChatDebugViewCellDuration),
        type: VirtualDomElements.Td,
      },
      text(getDurationText(event)),
      {
        childCount: 1,
        className: joinClassNames(ChatDebugViewCell, ChatDebugViewCellStatus, isErrorStatus && ChatDebugViewCellStatusError),
        type: VirtualDomElements.Td,
      },
      text(getStatusText(event)),
    ]
  })
}
