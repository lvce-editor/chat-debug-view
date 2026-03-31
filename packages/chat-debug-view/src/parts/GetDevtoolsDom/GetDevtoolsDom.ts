import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import * as InputName from '../InputName/InputName.ts'

const getTimestampText = (value: unknown): string => {
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return new Date(value).toISOString()
  }
  return '-'
}

const toTimeNumber = (value: unknown): number | undefined => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }
  if (typeof value === 'string') {
    const timestamp = Date.parse(value)
    if (!Number.isNaN(timestamp)) {
      return timestamp
    }
  }
  return undefined
}

const getDurationText = (event: ChatViewEvent): string => {
  const explicitDuration = event.durationMs ?? event.duration
  if (typeof explicitDuration === 'number' && Number.isFinite(explicitDuration)) {
    return `${explicitDuration}ms`
  }
  const start = toTimeNumber(event.started ?? event.startTime ?? event.startTimestamp ?? event.timestamp)
  const end = toTimeNumber(event.ended ?? event.endTime ?? event.endTimestamp ?? event.timestamp)
  if (start === undefined || end === undefined || end < start) {
    return '-'
  }
  return `${end - start}ms`
}

const getStartText = (event: ChatViewEvent): string => {
  return getTimestampText(event.started ?? event.startTime ?? event.startTimestamp ?? event.timestamp)
}

const getEndText = (event: ChatViewEvent): string => {
  return getTimestampText(event.ended ?? event.endTime ?? event.endTimestamp ?? event.timestamp)
}

const getDevtoolsRows = (events: readonly ChatViewEvent[], selectedEventIndex: number | null): readonly VirtualDomNode[] => {
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
    rows.push(
      {
        childCount: 2,
        className: `ChatDebugViewEventRowLabel${isSelected ? ' ChatDebugViewEventRowLabelSelected' : ''}`,
        type: VirtualDomElements.Label,
      },
      {
        checked: isSelected,
        childCount: 0,
        className: 'ChatDebugViewEventRowInput',
        inputType: 'radio',
        name: InputName.SelectedEventIndex,
        onChange: DomEventListenerFunctions.HandleSimpleInput,
        type: VirtualDomElements.Input,
        value: String(i),
      },
      {
        childCount: 4,
        className: `ChatDebugViewEventRow${isSelected ? ' ChatDebugViewEventRowSelected' : ''}`,
        type: VirtualDomElements.Div,
      },
      {
        childCount: 1,
        className: 'ChatDebugViewCell ChatDebugViewCellType',
        type: VirtualDomElements.Div,
      },
      text(event.type),
      {
        childCount: 1,
        className: 'ChatDebugViewCell',
        type: VirtualDomElements.Div,
      },
      text(getStartText(event)),
      {
        childCount: 1,
        className: 'ChatDebugViewCell',
        type: VirtualDomElements.Div,
      },
      text(getEndText(event)),
      {
        childCount: 1,
        className: 'ChatDebugViewCell ChatDebugViewCellDuration',
        type: VirtualDomElements.Div,
      },
      text(getDurationText(event)),
    )
  }
  return rows
}

export const getDevtoolsDom = (events: readonly ChatViewEvent[], selectedEventIndex: number | null): readonly VirtualDomNode[] => {
  const rowNodes = getDevtoolsRows(events, selectedEventIndex)
  const selectedEvent = selectedEventIndex === null ? undefined : events[selectedEventIndex]
  const selectedEventNodes = selectedEvent ? getEventNode(selectedEvent) : []
  const hasSelectedEvent = selectedEventNodes.length > 0
  return [
    {
      childCount: 2,
      className: 'ChatDebugViewDevtoolsMain',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewEvents',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 4,
      className: 'ChatDebugViewTableHeader',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellType',
      type: VirtualDomElements.Div,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell',
      type: VirtualDomElements.Div,
    },
    text('Started'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell',
      type: VirtualDomElements.Div,
    },
    text('Ended'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Div,
    },
    text('Duration'),
    {
      childCount: rowNodes.length === 0 ? 1 : rowNodes.length,
      className: 'ChatDebugViewTableBody',
      type: VirtualDomElements.Div,
    },
    ...rowNodes,
    ...(hasSelectedEvent
      ? [
          {
            childCount: 2,
            className: 'ChatDebugViewDetails',
            type: VirtualDomElements.Div,
          },
          {
            childCount: 2,
            className: 'ChatDebugViewDetailsTop',
            type: VirtualDomElements.Div,
          },
          {
            childCount: 1,
            className: 'ChatDebugViewDetailsTitle',
            type: VirtualDomElements.Div,
          },
          text('Details'),
          {
            childCount: 0,
            className: 'ChatDebugViewDetailsClose',
            inputType: 'checkbox',
            name: InputName.CloseDetails,
            onChange: DomEventListenerFunctions.HandleSimpleInput,
            type: VirtualDomElements.Input,
            value: 'close',
          },
          {
            childCount: selectedEventNodes.length,
            className: 'ChatDebugViewDetailsBody',
            type: VirtualDomElements.Div,
          },
          ...selectedEventNodes,
        ]
      : []),
  ]
}