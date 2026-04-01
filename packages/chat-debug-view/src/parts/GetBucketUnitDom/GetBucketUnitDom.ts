import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const getBucketUnitDom = (unitCount: number): readonly VirtualDomNode[] => {
  if (unitCount === 0) {
    return [
      {
        childCount: 0,
        className: 'ChatDebugViewTimelineBucketUnit ChatDebugViewTimelineBucketUnitEmpty',
        type: VirtualDomElements.Div,
      },
    ]
  }
  return Array.from({ length: unitCount }).fill({
    childCount: 0,
    className: 'ChatDebugViewTimelineBucketUnit',
    type: VirtualDomElements.Div,
  }) as readonly VirtualDomNode[]
}
