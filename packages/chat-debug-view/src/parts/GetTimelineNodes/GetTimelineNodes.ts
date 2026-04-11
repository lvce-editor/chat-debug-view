import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { TimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import {
  ChatDebugViewTimeline,
  ChatDebugViewTimelineBuckets,
  ChatDebugViewTimelineCursorGuide,
  ChatDebugViewTimelineCursorGuideVisible,
  ChatDebugViewTimelineInteractive,
  ChatDebugViewTimelineSelectionOverlay,
  ChatDebugViewTimelineSummary,
  ChatDebugViewTimelineTop,
} from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getBucketDom } from '../GetBucketDom/GetBucketDom.ts'
import { getSelectionNodesDom } from '../GetSelectionNodesDom/GetSelectionNodesDom.ts'
import { getTimelineBadgeNodes } from '../GetTimelineBadgeNodes/GetTimelineBadgeNodes.ts'
import { getTimelineSummary } from '../GetTimelineSummary/GetTimelineSummary.ts'

export const getTimelineNodes = (timelineInfo: TimelineInfo, hoverPercent: number | null = null): readonly VirtualDomNode[] => {
  if (timelineInfo.buckets.length === 0) {
    return []
  }
  const badgeNodes = getTimelineBadgeNodes(timelineInfo)
  const selectionNodes = getSelectionNodesDom(timelineInfo.hasSelection, timelineInfo.selectionStartPercent, timelineInfo.selectionEndPercent)
  const cursorGuideNodes =
    hoverPercent === null
      ? []
      : [
          {
            childCount: 0,
            className: `${ChatDebugViewTimelineCursorGuide} ${ChatDebugViewTimelineCursorGuideVisible}`,
            style: `left:${hoverPercent}%;`,
            type: VirtualDomElements.Div,
          },
        ]
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
      onPointerLeave: DomEventListenerFunctions.HandleTimelinePointerLeave,
      onPointerMove: DomEventListenerFunctions.HandleTimelinePointerMove,
      onPointerDown: DomEventListenerFunctions.HandleTimelinePointerDown,
      type: VirtualDomElements.Div,
    },
    ...badgeNodes,
    {
      childCount: timelineInfo.buckets.length,
      className: ChatDebugViewTimelineBuckets,
      type: VirtualDomElements.Div,
    },
    ...timelineInfo.buckets.flatMap(getBucketDom),
    {
      childCount: selectionNodes.length + cursorGuideNodes.length,
      className: ChatDebugViewTimelineSelectionOverlay,
      type: VirtualDomElements.Div,
    },
    ...cursorGuideNodes,
    ...selectionNodes,
  ]
}
