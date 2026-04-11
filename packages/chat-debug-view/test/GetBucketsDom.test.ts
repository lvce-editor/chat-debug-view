import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getBucketsDom } from '../src/parts/GetBucketsDom/GetBucketsDom.ts'

test('getBucketsDom should render the bucket container followed by bucket nodes', () => {
  const result = getBucketsDom([
    {
      count: 3,
      endSeconds: 7,
      isSelected: true,
      startSeconds: 5,
      unitCount: 2,
    },
    {
      count: 0,
      endSeconds: 0.5,
      isSelected: false,
      startSeconds: 0,
      unitCount: 0,
    },
  ])

  expect(result[0]).toEqual({
    childCount: 2,
    className: 'ChatDebugViewTimelineBuckets',
    type: VirtualDomElements.Div,
  })

  expect(result.slice(1)).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewTimelineBucket ChatDebugViewTimelineBucketSelected',
      'data-value': '5:7',
      onClick: DomEventListenerFunctions.HandleTimelineRangePreset,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewTimelineBucketBar ChatDebugViewTimelineBucketBarSelected',
      'data-value': '5:7',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewTimelineBucketUnit',
      'data-value': '5:7',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewTimelineBucketUnit',
      'data-value': '5:7',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewTimelineBucket',
      'data-value': '0:0.5',
      onClick: DomEventListenerFunctions.HandleTimelineRangePreset,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewTimelineBucketBar',
      'data-value': '0:0.5',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewTimelineBucketUnit ChatDebugViewTimelineBucketUnitEmpty',
      'data-value': '0:0.5',
      type: VirtualDomElements.Div,
    },
  ])
})
