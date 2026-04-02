import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { ChatDebugViewDevtoolsMain, ChatDebugViewDevtoolsSplit } from '../ClassNames/ClassNames.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import { getDetailsDom } from '../GetDetailsDom/GetDetailsDom.ts'
import { getDevtoolsRows } from '../GetDevtoolsRows/GetDevtoolsRows.ts'
import { getEmptyStateDom } from '../GetEmptyStateDom/GetEmptyStateDom.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getEventsClassName } from '../GetEventsClassName/GetEventsClassName.ts'
import { getPreviewEvent } from '../GetPreviewEvent/GetPreviewEvent.ts'
import { getSashNodesDom } from '../GetSashNodesDom/GetSashNodesDom.ts'
import { getTableDom } from '../GetTableDom/GetTableDom.ts'
import { getTimelineNodes } from '../GetTimelineNodes/GetTimelineNodes.ts'

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
  selectedDetailTab = DetailTab.Response,
): readonly VirtualDomNode[] => {
  const rowNodes = getDevtoolsRows(events, selectedEventIndex)
  const timelineNodes = getTimelineNodes(
    timelineEvents,
    timelineStartSeconds,
    timelineEndSeconds,
    timelineSelectionActive,
    timelineSelectionAnchorSeconds,
    timelineSelectionFocusSeconds,
  )
  const previewEventNodes = selectedEvent ? getEventNode(getPreviewEvent(selectedEvent)) : []
  const responseEventNodes = selectedEvent ? getEventNode(selectedEvent) : []
  const hasSelectedEvent = responseEventNodes.length > 0
  const tableNodes = events.length === 0 ? getEmptyStateDom(emptyMessage) : getTableDom(rowNodes, events.length)
  const eventsClassName = getEventsClassName(hasSelectedEvent)
  const detailsNodes = getDetailsDom(
    previewEventNodes,
    responseEventNodes,
    selectedEvent,
    DetailTab.isDetailTab(selectedDetailTab) ? selectedDetailTab : DetailTab.Response,
  )
  const sashNodes = getSashNodesDom(hasSelectedEvent)
  const splitChildCount = hasSelectedEvent ? 3 : 1
  const mainChildCount = 1 + (timelineNodes.length > 0 ? 1 : 0)
  return [
    {
      childCount: mainChildCount,
      className: ChatDebugViewDevtoolsMain,
      type: VirtualDomElements.Div,
    },
    ...timelineNodes,
    {
      childCount: splitChildCount,
      className: ChatDebugViewDevtoolsSplit,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: eventsClassName,
      role: 'application',
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    ...tableNodes,
    ...sashNodes,
    ...detailsNodes,
  ]
}
