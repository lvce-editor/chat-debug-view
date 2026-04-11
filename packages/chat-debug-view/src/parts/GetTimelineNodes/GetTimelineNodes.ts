import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { TimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import {
  ChatDebugViewTimeline,
  ChatDebugViewTimelineInteractive,
  ChatDebugViewTimelineSelectionOverlay,
  ChatDebugViewTimelineSummary,
  ChatDebugViewTimelineTop,
} from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getBucketsDom } from '../GetBucketsDom/GetBucketsDom.ts'
import { getCursorGuideNodes } from '../GetCursorGuideNodes/GetCursorGuideNodes.ts'
import { getSelectionNodesDom } from '../GetSelectionNodesDom/GetSelectionNodesDom.ts'
import { getTimelineBadgeNodes } from '../GetTimelineBadgeNodes/GetTimelineBadgeNodes.ts'
import { getTimelineSummary } from '../GetTimelineSummary/GetTimelineSummary.ts'

export const getTimelineNodes = (timelineInfo: TimelineInfo, hoverPercent: number | null = null): readonly VirtualDomNode[] => {
  if (timelineInfo.buckets.length === 0) {
    return []
  }
  const badgeNodes = getTimelineBadgeNodes(timelineInfo)
  const bucketNodes = getBucketsDom(timelineInfo.buckets)
  const selectionNodes = getSelectionNodesDom(timelineInfo.hasSelection, timelineInfo.selectionStartPercent, timelineInfo.selectionEndPercent)
  const cursorGuideNodes = getCursorGuideNodes(hoverPercent)
  return [
    {
      childCount: 2,
      className: ChatDebugViewTimeline,
      onContextMenu: DomEventListenerFunctions.HandleTimelineContextMenu,
      type: VirtualDomElements.Section,
    },
    {
      childCount: 1,
      className: ChatDebugViewTimelineTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ChatDebugViewTimelineSummary,
      type: VirtualDomElements.H2,
    },
    text(getTimelineSummary(timelineInfo)),
    {
      childCount: 3,
      className: ChatDebugViewTimelineInteractive,
      onDblClick: DomEventListenerFunctions.HandleTimelineDoubleClick,
      onPointerDown: DomEventListenerFunctions.HandleTimelinePointerDown,
      onPointerLeave: DomEventListenerFunctions.HandleTimelinePointerLeave,
      onPointerMove: DomEventListenerFunctions.HandleTimelinePointerMove,
      type: VirtualDomElements.Div,
    },
    ...badgeNodes,
    ...bucketNodes,
    {
      childCount: selectionNodes.length + cursorGuideNodes.length,
      className: ChatDebugViewTimelineSelectionOverlay,
      type: VirtualDomElements.Div,
    },
    ...cursorGuideNodes,
    ...selectionNodes,
  ]
}
