import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getBucketDom } from '../GetBucketDom/GetBucketDom.ts'
import { getTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import { getTimelineSummary } from '../GetTimelineSummary/GetTimelineSummary.ts'

export const getTimelineNodes = (
  timelineEvents: readonly ChatViewEvent[],
  timelineStartSeconds: string,
  timelineEndSeconds: string,
): readonly VirtualDomNode[] => {
  const timelineInfo = getTimelineInfo(timelineEvents, timelineStartSeconds, timelineEndSeconds)
  if (timelineInfo.buckets.length === 0) {
    return []
  }
  return [
    {
      childCount: 2,
      className: 'ChatDebugViewTimeline',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewTimelineTop',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewTimelineTitle',
      type: VirtualDomElements.Div,
    },
    text('Timeline'),
    {
      childCount: 1,
      className: 'ChatDebugViewTimelineSummary',
      type: VirtualDomElements.Div,
    },
    text(getTimelineSummary(timelineEvents, timelineStartSeconds, timelineEndSeconds)),
    {
      childCount: timelineInfo.buckets.length,
      className: 'ChatDebugViewTimelineBuckets',
      type: VirtualDomElements.Div,
    },
    ...timelineInfo.buckets.flatMap(getBucketDom),
  ]
}
