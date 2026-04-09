import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getBucketDom } from '../src/parts/GetBucketDom/GetBucketDom.ts'

test('getBucketDom should render selected bucket with units', () => {
  const result = getBucketDom({
    count: 3,
    endSeconds: 7,
    isSelected: true,
    startSeconds: 5,
    unitCount: 2,
  })

  expect(result).toEqual([
    {
      'data-value': '5:7',
      childCount: 1,
      className: 'ChatDebugViewTimelineBucket ChatDebugViewTimelineBucketSelected',
      onClick: DomEventListenerFunctions.HandleTimelineRangePreset,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewTimelineBucketBar ChatDebugViewTimelineBucketBarSelected',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewTimelineBucketUnit',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewTimelineBucketUnit',
      type: VirtualDomElements.Div,
    },
  ])
})

test('getBucketDom should render empty bucket placeholder', () => {
  const result = getBucketDom({
    count: 0,
    endSeconds: 0.5,
    isSelected: false,
    startSeconds: 0,
    unitCount: 0,
  })

  expect(result).toEqual([
    {
      'data-value': '0:0.5',
      childCount: 1,
      className: 'ChatDebugViewTimelineBucket',
      onClick: DomEventListenerFunctions.HandleTimelineRangePreset,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewTimelineBucketBar',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewTimelineBucketUnit ChatDebugViewTimelineBucketUnitEmpty',
      type: VirtualDomElements.Div,
    },
  ])
})
