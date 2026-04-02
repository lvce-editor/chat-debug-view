import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getDurationText } from '../GetDurationText/GetDurationText.ts'
import { getEventTypeLabel } from '../GetEventTypeLabel/GetEventTypeLabel.ts'
import { getStatusText } from '../GetStatusText/GetStatusText.ts'
import { hasErrorStatus } from '../HasErrorStatus/HasErrorStatus.ts'

export const getDevtoolsRows = (events: readonly ChatViewEvent[], selectedEventIndex: number | null): readonly VirtualDomNode[] => {
  return events.flatMap((event, i) => {
    const isSelected = selectedEventIndex === i
    const isErrorStatus = hasErrorStatus(event)
    const rowIndex = String(i)
    return [
      {
        childCount: 3,
        className: `ChatDebugViewEventRow${isSelected ? ' ChatDebugViewEventRowSelected' : ''}`,
        'data-index': rowIndex,
        type: VirtualDomElements.Tr,
      },
      {
        childCount: 1,
        className: 'ChatDebugViewCell ChatDebugViewCellType',
        type: VirtualDomElements.Td,
      },
      text(getEventTypeLabel(event)),
      {
        childCount: 1,
        className: 'ChatDebugViewCell ChatDebugViewCellDuration',
        type: VirtualDomElements.Td,
      },
      text(getDurationText(event)),
      {
        childCount: 1,
        className: `ChatDebugViewCell ChatDebugViewCellStatus${isErrorStatus ? ' ChatDebugViewCellStatusError' : ''}`,
        type: VirtualDomElements.Td,
      },
      text(getStatusText(event)),
    ]
  })
}
