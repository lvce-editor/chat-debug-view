import { type VirtualDomNode, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { DetailTab as DetailTabType } from '../DetailTab/DetailTab.ts'
import type { TimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugView, ChatDebugViewDevtools } from '../ClassNames/ClassNames.ts'
import { createDetailTabs } from '../CreateDetailTabs/CreateDetailTabs.ts'
import { createDevtoolsRows } from '../CreateDevtoolsRows/CreateDevtoolsRows.ts'
import { getDetailsDom } from '../GetDetailsDom/GetDetailsDom.ts'
import { getDevtoolsRows } from '../GetDevtoolsRows/GetDevtoolsRows.ts'
import { getEffectiveTimelineRange } from '../GetEffectiveTimelineRange/GetEffectiveTimelineRange.ts'
import { getEmptyStateDom } from '../GetEmptyStateDom/GetEmptyStateDom.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getEventsClassName } from '../GetEventsClassName/GetEventsClassName.ts'
import { getPayloadEvent } from '../GetPayloadEvent/GetPayloadEvent.ts'
import { getPreviewEvent } from '../GetPreviewEvent/GetPreviewEvent.ts'
import { getPreviewEventNodes } from '../GetPreviewEventNodes/GetPreviewEventNodes.ts'
import { getResponseEvent } from '../GetResponseEvent/GetResponseEvent.ts'
import { getSashNodesDom } from '../GetSashNodesDom/GetSashNodesDom.ts'
import { getSplitViewDom } from '../GetSplitViewDom/GetSplitViewDom.ts'
import { getTableSummary } from '../GetTableSummary/GetTableSummary.ts'
import { getTableWrapperWrapperDom } from '../GetTableWrapperWrapperDom/GetTableWrapperWrapperDom.ts'
import { getTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import { getTimelineDom } from '../GetTimelineNodes/GetTimelineNodes.ts'
import { getPreviewVirtualizationState } from '../PreviewVirtualization/PreviewVirtualization.ts'
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
  detailTabs: readonly DetailTabType[] = createDetailTabs(),
  visibleTableColumns: readonly string[] = TableColumn.defaultVisibleTableColumns,
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
  timelineInfo?: TimelineInfo,
  timelineHoverPercent: number | null = null,
  focus = 0,
  previewTextCursorRowIndex: number | null = null,
  previewTextCursorColumnIndex: number | null = null,
  previewTextDeltaY = 0,
  previewTextViewportHeight = 0,
  minLineY = 0,
  maxLineY = events.length,
): readonly VirtualDomNode[] => {
  const visibleEvents = events.slice(minLineY, maxLineY)
  const rows = createDevtoolsRows(visibleEvents, selectedEventIndex, minLineY)
  const rowNodes = getDevtoolsRows(rows, visibleTableColumns)
  const effectiveRange = getEffectiveTimelineRange(
    timelineStartSeconds,
    timelineEndSeconds,
    timelineSelectionActive,
    timelineSelectionAnchorSeconds,
    timelineSelectionFocusSeconds,
  )
  const resolvedTimelineInfo = timelineInfo || getTimelineInfo(timelineEvents, effectiveRange.startSeconds, effectiveRange.endSeconds)
  const timelineNodes = getTimelineDom(resolvedTimelineInfo, timelineHoverPercent)
  const previewEvent = selectedEvent ? getPreviewEvent(selectedEvent) : undefined
  const previewVirtualization = getPreviewVirtualizationState(selectedEvent, previewTextViewportHeight, previewTextDeltaY)
  const previewVirtualizationOptions =
    previewTextViewportHeight <= 0 || previewVirtualization.totalLineCount === 0
      ? undefined
      : {
          endLineY: previewVirtualization.endLineY,
          showScrollBar: previewVirtualization.showScrollBar,
          startLineY: previewVirtualization.startLineY,
        }
  const previewEventNodes = getPreviewEventNodes(
    previewEvent,
    selectedEvent,
    previewTextCursorRowIndex === null || previewTextCursorColumnIndex === null
      ? null
      : {
          columnIndex: previewTextCursorColumnIndex,
          rowIndex: previewTextCursorRowIndex,
        },
    previewVirtualizationOptions,
  )
  const payloadEventNodes = selectedEvent ? getEventNode(getPayloadEvent(selectedEvent)) : []
  const responseEventNodes = selectedEvent ? getEventNode(getResponseEvent(selectedEvent)) : []
  const hasSelectedEvent = !!selectedEvent
  const eventsClassName = getEventsClassName(hasSelectedEvent)
  const summary = getTableSummary(events)
  const showScrollBar = visibleEvents.length < events.length
  const tableNodes =
    events.length === 0
      ? getEmptyStateDom(emptyMessage)
      : getTableWrapperWrapperDom(rowNodes, visibleEvents.length, visibleTableColumns, tableColumns, summary, focus, '', '', showScrollBar)

  const detailsNodes = getDetailsDom(
    previewEventNodes,
    payloadEventNodes,
    responseEventNodes,
    selectedEvent,
    detailTabs,
    previewTextCursorRowIndex,
    previewTextCursorColumnIndex,
    previewVirtualizationOptions,
  )
  const sashNodes = getSashNodesDom(hasSelectedEvent)
  const splitChildCount = hasSelectedEvent ? 3 : 1
  const rootChildCount = 3
  return [
    {
      childCount: rootChildCount,
      className: mergeClassNames(ChatDebugView, ChatDebugViewDevtools),
      type: VirtualDomElements.Div,
    },
    ...timelineNodes,
    ...getSplitViewDom(splitChildCount, eventsClassName, tableNodes, sashNodes, detailsNodes),
  ]
}
