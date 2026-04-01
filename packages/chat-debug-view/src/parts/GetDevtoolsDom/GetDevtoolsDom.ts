import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getDetailsDom } from '../GetDetailsDom/GetDetailsDom.ts'
import { getDevtoolsRows } from '../GetDevtoolsRows/GetDevtoolsRows.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getEventsClassName } from '../GetEventsClassName/GetEventsClassName.ts'
import { getTableDom } from '../GetTableDom/GetTableDom.ts'
import { getTimelineNodes } from '../GetTimelineNodes/GetTimelineNodes.ts'

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
  const tableNodes = getTableDom(rowNodes, events.length)
  const eventsClassName = getEventsClassName(hasSelectedEvent, timelineNodes.length > 0)
  const eventsChildCount = timelineNodes.length > 0 ? 2 : 1
  const detailsNodes = getDetailsDom(selectedEventNodes)
  return [
    {
      childCount: hasSelectedEvent ? 2 : 1,
      className: 'ChatDebugViewDevtoolsMain',
      type: VirtualDomElements.Div,
    },
    {
      childCount: eventsChildCount,
      className: eventsClassName,
      type: VirtualDomElements.Div,
    },
    ...timelineNodes,
    ...tableNodes,
    ...detailsNodes,
  ]
}
