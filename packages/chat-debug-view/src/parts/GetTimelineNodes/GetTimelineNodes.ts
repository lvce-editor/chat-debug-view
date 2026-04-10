import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { TimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import {
  ChatDebugViewTimeline,
  ChatDebugViewTimelineBuckets,
  ChatDebugViewTimelineInteractive,
  ChatDebugViewTimelineSelectionOverlay,
  ChatDebugViewTimelineSummary,
  ChatDebugViewTimelineTop,
} from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getBucketDom } from '../GetBucketDom/GetBucketDom.ts'
import { getSelectionNodesDom } from '../GetSelectionNodesDom/GetSelectionNodesDom.ts'
import { getTimelineSummary } from '../GetTimelineSummary/GetTimelineSummary.ts'

export const getTimelineNodes = (timelineInfo: TimelineInfo): readonly VirtualDomNode[] => {
  if (timelineInfo.buckets.length === 0) {
    return []
  }
  const selectionNodes = getSelectionNodesDom(timelineInfo.hasSelection, timelineInfo.selectionStartPercent, timelineInfo.selectionEndPercent)
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
      childCount: 2,
      className: ChatDebugViewTimelineInteractive,
      onDoubleClick: DomEventListenerFunctions.HandleTimelineDoubleClick,
      onPointerDown: DomEventListenerFunctions.HandleTimelinePointerDown,
      type: VirtualDomElements.Div,
    },
    {
      childCount: timelineInfo.buckets.length,
      className: ChatDebugViewTimelineBuckets,
      type: VirtualDomElements.Div,
    },
    ...timelineInfo.buckets.flatMap(getBucketDom),
    {
      childCount: selectionNodes.length,
      className: ChatDebugViewTimelineSelectionOverlay,
      type: VirtualDomElements.Div,
    },
    ...selectionNodes,
  ]
}
