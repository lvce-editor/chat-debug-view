import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getDevtoolsRows } from '../GetDevtoolsRows/GetDevtoolsRows.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getTimelineNodes } from '../GetTimelineNodes/GetTimelineNodes.ts'
import * as InputName from '../InputName/InputName.ts'

export const getDevtoolsDom = (
  events: readonly ChatViewEvent[],
  selectedEventIndex: number | null,
  timelineEvents: readonly ChatViewEvent[],
  timelineStartSeconds: string,
  timelineEndSeconds: string,
): readonly VirtualDomNode[] => {
  const rowNodes = getDevtoolsRows(events, selectedEventIndex)
  const timelineNodes = getTimelineNodes(timelineEvents, timelineStartSeconds, timelineEndSeconds)
  const selectedEvent = selectedEventIndex === null ? undefined : events[selectedEventIndex]
  const selectedEventNodes = selectedEvent ? getEventNode(selectedEvent) : []
  const hasSelectedEvent = selectedEventNodes.length > 0
  const eventsClassName = `${hasSelectedEvent ? 'ChatDebugViewEvents' : 'ChatDebugViewEvents ChatDebugViewEventsFullWidth'}${timelineNodes.length > 0 ? ' ChatDebugViewEvents--timeline' : ''}`
  const detailsNodes = hasSelectedEvent
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
    : []
  return [
    {
      childCount: hasSelectedEvent ? 2 : 1,
      className: 'ChatDebugViewDevtoolsMain',
      type: VirtualDomElements.Div,
    },
    {
      childCount: timelineNodes.length > 0 ? 3 : 2,
      className: eventsClassName,
      type: VirtualDomElements.Div,
    },
    ...timelineNodes,
    {
      childCount: 5,
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
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellStatus',
      type: VirtualDomElements.Div,
    },
    text('Status'),
    {
      childCount: rowNodes.length === 0 ? 1 : rowNodes.length,
      className: 'ChatDebugViewTableBody',
      type: VirtualDomElements.Div,
    },
    ...rowNodes,
    ...detailsNodes,
  ]
}
