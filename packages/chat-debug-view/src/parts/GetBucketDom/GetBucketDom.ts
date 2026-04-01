import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { formatTimelinePresetValue } from '../FormatTimelinePresetValue/FormatTimelinePresetValue.ts'
import type { TimelineBucket } from '../GetTimelineInfo/GetTimelineInfo.ts'
import * as InputName from '../InputName/InputName.ts'

export const getBucketDom = (bucket: TimelineBucket): readonly VirtualDomNode[] => {
  const presetValue = `${formatTimelinePresetValue(bucket.startSeconds)}:${formatTimelinePresetValue(bucket.endSeconds)}`
  return [
    {
      childCount: 2,
      className: `ChatDebugViewTimelineBucket${bucket.isSelected ? ' ChatDebugViewTimelineBucketSelected' : ''}`,
      type: VirtualDomElements.Label,
    },
    {
      checked: false,
      childCount: 0,
      className: 'ChatDebugViewTimelinePresetInput',
      inputType: 'radio',
      name: InputName.TimelineRangePreset,
      onChange: DomEventListenerFunctions.HandleSimpleInput,
      type: VirtualDomElements.Input,
      value: presetValue,
    },
    {
      childCount: bucket.unitCount === 0 ? 1 : bucket.unitCount,
      className: `ChatDebugViewTimelineBucketBar${bucket.isSelected ? ' ChatDebugViewTimelineBucketBarSelected' : ''}`,
      type: VirtualDomElements.Div,
    },
    ...(bucket.unitCount === 0
      ? [
          {
            childCount: 0,
            className: 'ChatDebugViewTimelineBucketUnit ChatDebugViewTimelineBucketUnitEmpty',
            type: VirtualDomElements.Div,
          },
        ]
      : (Array.from({ length: bucket.unitCount }).fill({
          childCount: 0,
          className: 'ChatDebugViewTimelineBucketUnit',
          type: VirtualDomElements.Div,
        }) as VirtualDomNode[])),
  ]
}
