import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getBucketDom } from '../GetBucketDom/GetBucketDom.ts'
import { getTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import { getTimelineSummary } from '../GetTimelineSummary/GetTimelineSummary.ts'
import * as InputName from '../InputName/InputName.ts'

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
      childCount: 3,
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
      childCount: 1,
      className: 'ChatDebugViewTimelineControls',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: `ChatDebugViewTimelineReset${timelineInfo.hasSelection ? '' : ' ChatDebugViewTimelineResetSelected'}`,
      type: VirtualDomElements.Label,
    },
    {
      checked: !timelineInfo.hasSelection,
      childCount: 0,
      className: 'ChatDebugViewTimelinePresetInput',
      inputType: 'radio',
      name: InputName.TimelineRangePreset,
      onChange: DomEventListenerFunctions.HandleSimpleInput,
      type: VirtualDomElements.Input,
      value: '',
    },
    text('All'),
    {
      childCount: timelineInfo.buckets.length,
      className: 'ChatDebugViewTimelineBuckets',
      type: VirtualDomElements.Div,
    },
    ...timelineInfo.buckets.flatMap(getBucketDom),
  ]
}
