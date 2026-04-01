import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getDurationText } from '../GetDurationText/GetDurationText.ts'
import { getEndText } from '../GetEndText/GetEndText.ts'
import { getStartText } from '../GetStartText/GetStartText.ts'
import { getStatusText } from '../GetStatusText/GetStatusText.ts'

export const getDevtoolsRows = (events: readonly ChatViewEvent[], selectedEventIndex: number | null): readonly VirtualDomNode[] => {
  if (events.length === 0) {
    return [
      {
        childCount: 1,
        className: 'ChatDebugViewEmpty',
        type: VirtualDomElements.Div,
      },
      text('No events'),
    ]
  }
  const rows: VirtualDomNode[] = []
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    const isSelected = selectedEventIndex === i
    const rowIndex = String(i)
    rows.push(
      {
        childCount: 5,
        'data-index': rowIndex,
        className: `ChatDebugViewEventRow${isSelected ? ' ChatDebugViewEventRowSelected' : ''}`,
        type: VirtualDomElements.Div,
      },
      {
        childCount: 1,
        'data-index': rowIndex,
        className: 'ChatDebugViewCell ChatDebugViewCellType',
        type: VirtualDomElements.Div,
      },
      text(event.type),
      {
        childCount: 1,
        'data-index': rowIndex,
        className: 'ChatDebugViewCell',
        type: VirtualDomElements.Div,
      },
      text(getStartText(event)),
      {
        childCount: 1,
        'data-index': rowIndex,
        className: 'ChatDebugViewCell',
        type: VirtualDomElements.Div,
      },
      text(getEndText(event)),
      {
        childCount: 1,
        'data-index': rowIndex,
        className: 'ChatDebugViewCell ChatDebugViewCellDuration',
        type: VirtualDomElements.Div,
      },
      text(getDurationText(event)),
      {
        childCount: 1,
        'data-index': rowIndex,
        className: 'ChatDebugViewCell ChatDebugViewCellStatus',
        type: VirtualDomElements.Div,
      },
      text(getStatusText(event)),
    )
  }
  return rows
}
