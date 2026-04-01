import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getDurationText } from '../GetDurationText/GetDurationText.ts'
import { getEventTypeLabel } from '../GetEventTypeLabel/GetEventTypeLabel.ts'
import { getStatusText } from '../GetStatusText/GetStatusText.ts'

export const getDevtoolsRows = (events: readonly ChatViewEvent[], selectedEventIndex: number | null): readonly VirtualDomNode[] => {
  const rows: VirtualDomNode[] = []
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    const isSelected = selectedEventIndex === i
    const rowIndex = String(i)
    rows.push(
      {
        childCount: 3,
        className: `ChatDebugViewEventRow${isSelected ? ' ChatDebugViewEventRowSelected' : ''}`,
        'data-index': rowIndex,
        type: VirtualDomElements.Tr,
      },
      {
        childCount: 1,
        className: 'ChatDebugViewCell ChatDebugViewCellType',
        'data-index': rowIndex,
        type: VirtualDomElements.Td,
      },
      text(getEventTypeLabel(event)),
      {
        childCount: 1,
        className: 'ChatDebugViewCell ChatDebugViewCellDuration',
        'data-index': rowIndex,
        type: VirtualDomElements.Td,
      },
      text(getDurationText(event)),
      {
        childCount: 1,
        className: 'ChatDebugViewCell ChatDebugViewCellStatus',
        'data-index': rowIndex,
        type: VirtualDomElements.Td,
      },
      text(getStatusText(event)),
    )
  }
  return rows
}
