import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { DetailTab as DetailTabType } from '../DetailTab/DetailTab.ts'
import type { TimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugViewDevtoolsMain, ChatDebugViewDevtoolsSplit } from '../ClassNames/ClassNames.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import { getDetailsDom } from '../GetDetailsDom/GetDetailsDom.ts'
import { getDevtoolsRows } from '../GetDevtoolsRows/GetDevtoolsRows.ts'
import { getEffectiveTimelineRange } from '../GetEffectiveTimelineRange/GetEffectiveTimelineRange.ts'
import { getEmptyStateDom } from '../GetEmptyStateDom/GetEmptyStateDom.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getEventsClassName } from '../GetEventsClassName/GetEventsClassName.ts'
import { getPayloadEvent } from '../GetPayloadEvent/GetPayloadEvent.ts'
import { getPreviewEvent } from '../GetPreviewEvent/GetPreviewEvent.ts'
import { getPreviewEventNodes } from '../GetPreviewEventNodes/GetPreviewEventNodes.ts'
import { getSashNodesDom } from '../GetSashNodesDom/GetSashNodesDom.ts'
import { getTableDom } from '../GetTableDom/GetTableDom.ts'
import { getTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import { getTimelineNodes } from '../GetTimelineNodes/GetTimelineNodes.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getDevtoolsDom = (
  events: readonly ChatViewEvent[],
  selectedEvent: ChatViewEvent | null,
  selectedEventIndex: number | null,
  timelineEvents: readonly ChatViewEvent[],
  timelineStartSeconds: string,
  timelineEndSeconds: string,
  emptyMessage = ChatDebugStrings.noEventsFound(),
  timelineSelectionActive = false,
  timelineSelectionAnchorSeconds = '',
  timelineSelectionFocusSeconds = '',
  visibleTableColumns: readonly string[] = TableColumn.defaultVisibleTableColumns,
  detailTabs: readonly DetailTabType[] = DetailTab.createDetailTabs(),
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
  timelineInfo?: TimelineInfo,
): readonly VirtualDomNode[] => {
  const rowNodes = getDevtoolsRows(events, selectedEventIndex, visibleTableColumns)
  const effectiveRange = getEffectiveTimelineRange(
    timelineStartSeconds,
    timelineEndSeconds,
    timelineSelectionActive,
    timelineSelectionAnchorSeconds,
    timelineSelectionFocusSeconds,
  )
  const resolvedTimelineInfo = timelineInfo || getTimelineInfo(timelineEvents, effectiveRange.startSeconds, effectiveRange.endSeconds)
  const timelineNodes = getTimelineNodes(resolvedTimelineInfo)
  const previewEvent = selectedEvent ? getPreviewEvent(selectedEvent) : undefined
  const previewEventNodes = getPreviewEventNodes(previewEvent, selectedEvent)
  const payloadEventNodes = selectedEvent ? getEventNode(getPayloadEvent(selectedEvent)) : []
  const responseEventNodes = selectedEvent ? getEventNode(selectedEvent) : []
  const hasSelectedEvent = responseEventNodes.length > 0
  const tableNodes = events.length === 0 ? getEmptyStateDom(emptyMessage) : getTableDom(rowNodes, events.length, visibleTableColumns, tableColumns)
  const eventsClassName = getEventsClassName(hasSelectedEvent)
  const detailsNodes = getDetailsDom(previewEventNodes, payloadEventNodes, responseEventNodes, selectedEvent, detailTabs)
  const sashNodes = getSashNodesDom(hasSelectedEvent)
  const splitChildCount = hasSelectedEvent ? 3 : 1
  const mainChildCount = 1 + (timelineNodes.length > 0 ? 1 : 0)
  return [
    {
      childCount: mainChildCount,
      className: ChatDebugViewDevtoolsMain,
      role: AriaRoles.None,
      type: VirtualDomElements.Div,
    },
    ...timelineNodes,
    {
      childCount: splitChildCount,
      className: ChatDebugViewDevtoolsSplit,
      role: AriaRoles.None,
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
