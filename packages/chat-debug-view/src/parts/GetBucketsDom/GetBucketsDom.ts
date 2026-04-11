import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewTimelineBuckets } from '../ClassNames/ClassNames.ts'
import type { TimelineBucket } from '../GetTimelineInfo/GetTimelineInfo.ts'
import { getBucketDom } from '../GetBucketDom/GetBucketDom.ts'

export const getBucketsDom = (buckets: readonly TimelineBucket[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: buckets.length,
      className: ChatDebugViewTimelineBuckets,
      type: VirtualDomElements.Div,
    },
    ...buckets.flatMap(getBucketDom),
  ]
}
