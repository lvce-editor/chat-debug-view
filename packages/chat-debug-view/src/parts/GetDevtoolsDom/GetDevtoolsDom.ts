import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getDetailsDom } from '../GetDetailsDom/GetDetailsDom.ts'
import { getDevtoolsRows } from '../GetDevtoolsRows/GetDevtoolsRows.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getEventsClassName } from '../GetEventsClassName/GetEventsClassName.ts'
import { getTableDom } from '../GetTableDom/GetTableDom.ts'
import { getTimelineNodes } from '../GetTimelineNodes/GetTimelineNodes.ts'

const getEmptyStateDom = (emptyMessage: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: 'ChatDebugViewEmpty',
      type: VirtualDomElements.Div,
    },
    text(emptyMessage),
  ]
}

export const getDevtoolsDom = (
  events: readonly ChatViewEvent[],
  selectedEvent: ChatViewEvent | null,
  selectedEventIndex: number | null,
  timelineEvents: readonly ChatViewEvent[],
  timelineStartSeconds: string,
  timelineEndSeconds: string,
  emptyMessage = 'No events have been found',
  timelineSelectionActive = false,
  timelineSelectionAnchorSeconds = '',
  timelineSelectionFocusSeconds = '',
): readonly VirtualDomNode[] => {
  const rowNodes = getDevtoolsRows(events, selectedEventIndex)
<<<<<<< HEAD
  const timelineNodes = getTimelineNodes(
    timelineEvents,
    timelineStartSeconds,
    timelineEndSeconds,
    timelineSelectionActive,
    timelineSelectionAnchorSeconds,
    timelineSelectionFocusSeconds,
  )
  const selectedEvent = selectedEventIndex === null ? undefined : events[selectedEventIndex]
=======
  const timelineNodes = getTimelineNodes(timelineEvents, timelineStartSeconds, timelineEndSeconds)
>>>>>>> origin/main
  const selectedEventNodes = selectedEvent ? getEventNode(selectedEvent) : []
  const hasSelectedEvent = selectedEventNodes.length > 0
  const tableNodes = events.length === 0 ? getEmptyStateDom(emptyMessage) : getTableDom(rowNodes, events.length)
  const eventsClassName = getEventsClassName(hasSelectedEvent)
  const detailsNodes = getDetailsDom(selectedEventNodes)
  const sashNodes = hasSelectedEvent
    ? [
        {
          childCount: 1,
          className: 'ChatDebugViewSash',
          onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
          type: VirtualDomElements.Div,
        },
        {
          childCount: 0,
          className: 'ChatDebugViewSashLine',
          type: VirtualDomElements.Div,
        },
      ]
    : []
  const splitChildCount = hasSelectedEvent ? 3 : 1
  const mainChildCount = 1 + (timelineNodes.length > 0 ? 1 : 0)
  return [
    {
      childCount: mainChildCount,
      className: 'ChatDebugViewDevtoolsMain',
      type: VirtualDomElements.Div,
    },
    ...timelineNodes,
    {
      childCount: splitChildCount,
      className: 'ChatDebugViewDevtoolsSplit',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: eventsClassName,
      type: VirtualDomElements.Div,
    },
    ...tableNodes,
    ...sashNodes,
    ...detailsNodes,
  ]
}
