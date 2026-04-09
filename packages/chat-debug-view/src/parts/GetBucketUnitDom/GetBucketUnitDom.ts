import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewTimelineBucketUnit, ChatDebugViewTimelineBucketUnitEmpty, joinClassNames } from '../ClassNames/ClassNames.ts'

export const getBucketUnitDom = (unitCount: number, presetValue?: string): readonly VirtualDomNode[] => {
  if (unitCount === 0) {
    return [
      {
        ...(presetValue
          ? {
              'data-value': presetValue,
            }
          : {}),
        childCount: 0,
        className: joinClassNames(ChatDebugViewTimelineBucketUnit, ChatDebugViewTimelineBucketUnitEmpty),
        type: VirtualDomElements.Div,
      },
    ]
  }
  return Array.from({ length: unitCount }).fill({
    ...(presetValue
      ? {
          'data-value': presetValue,
        }
      : {}),
    childCount: 0,
    className: ChatDebugViewTimelineBucketUnit,
    type: VirtualDomElements.Div,
  }) as readonly VirtualDomNode[]
}
