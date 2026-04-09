import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { TimelineBucket } from '../GetTimelineInfo/GetTimelineInfo.ts'
import {
  ChatDebugViewTimelineBucket,
  ChatDebugViewTimelineBucketBar,
  ChatDebugViewTimelineBucketBarSelected,
  ChatDebugViewTimelineBucketSelected,
  joinClassNames,
} from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { formatTimelinePresetValue } from '../FormatTimelinePresetValue/FormatTimelinePresetValue.ts'
import { getBucketUnitDom } from '../GetBucketUnitDom/GetBucketUnitDom.ts'

export const getBucketDom = (bucket: TimelineBucket): readonly VirtualDomNode[] => {
  const presetValue = `${formatTimelinePresetValue(bucket.startSeconds)}:${formatTimelinePresetValue(bucket.endSeconds)}`
  return [
    {
      'data-value': presetValue,
      childCount: 1,
      className: joinClassNames(ChatDebugViewTimelineBucket, bucket.isSelected && ChatDebugViewTimelineBucketSelected),
      onClick: DomEventListenerFunctions.HandleTimelineRangePreset,
      type: VirtualDomElements.Div,
    },
    {
      childCount: bucket.unitCount === 0 ? 1 : bucket.unitCount,
      className: joinClassNames(ChatDebugViewTimelineBucketBar, bucket.isSelected && ChatDebugViewTimelineBucketBarSelected),
      type: VirtualDomElements.Div,
    },
    ...getBucketUnitDom(bucket.unitCount),
  ]
}
