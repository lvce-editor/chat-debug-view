import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import {
  ChatDebugViewTimeline,
  ChatDebugViewTimelineBuckets,
  ChatDebugViewTimelineInteractive,
  ChatDebugViewTimelineSelectionMarker,
  ChatDebugViewTimelineSelectionMarkerEnd,
  ChatDebugViewTimelineSelectionMarkerStart,
  ChatDebugViewTimelineSelectionOverlay,
  ChatDebugViewTimelineSelectionRange,
  ChatDebugViewTimelineSummary,
  ChatDebugViewTimelineTop,
  joinClassNames,
} from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { formatPercent } from '../FormatPercent/FormatPercent.ts'
import { getBucketDom } from '../GetBucketDom/GetBucketDom.ts'
import { getEffectiveTimelineRange } from '../GetEffectiveTimelineRange/GetEffectiveTimelineRange.ts'
import { getTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import { getTimelineSummary } from '../GetTimelineSummary/GetTimelineSummary.ts'

export const getTimelineNodes = (
  timelineEvents: readonly ChatViewEvent[],
  timelineStartSeconds: string,
  timelineEndSeconds: string,
  timelineSelectionActive = false,
  timelineSelectionAnchorSeconds = '',
  timelineSelectionFocusSeconds = '',
): readonly VirtualDomNode[] => {
  const effectiveRange = getEffectiveTimelineRange(
    timelineStartSeconds,
    timelineEndSeconds,
    timelineSelectionActive,
    timelineSelectionAnchorSeconds,
    timelineSelectionFocusSeconds,
  )
  const timelineInfo = getTimelineInfo(timelineEvents, effectiveRange.startSeconds, effectiveRange.endSeconds)
  if (timelineInfo.buckets.length === 0) {
    return []
  }
  const selectionNodes =
    timelineInfo.hasSelection && timelineInfo.selectionStartPercent !== null && timelineInfo.selectionEndPercent !== null
      ? [
          {
            childCount: 0,
            className: ChatDebugViewTimelineSelectionRange,
            style: `left:${formatPercent(timelineInfo.selectionStartPercent)};width:${formatPercent(
              timelineInfo.selectionEndPercent - timelineInfo.selectionStartPercent,
            )};`,
            type: VirtualDomElements.Div,
          },
          {
            childCount: 0,
            className: joinClassNames(ChatDebugViewTimelineSelectionMarker, ChatDebugViewTimelineSelectionMarkerStart),
            style: `left:${formatPercent(timelineInfo.selectionStartPercent)};`,
            type: VirtualDomElements.Div,
          },
          {
            childCount: 0,
            className: joinClassNames(ChatDebugViewTimelineSelectionMarker, ChatDebugViewTimelineSelectionMarkerEnd),
            style: `left:${formatPercent(timelineInfo.selectionEndPercent)};`,
            type: VirtualDomElements.Div,
          },
        ]
      : []
  return [
    {
      childCount: 2,
      className: ChatDebugViewTimeline,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ChatDebugViewTimelineTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ChatDebugViewTimelineSummary,
      type: VirtualDomElements.Div,
    },
    text(getTimelineSummary(timelineEvents, effectiveRange.startSeconds, effectiveRange.endSeconds)),
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
