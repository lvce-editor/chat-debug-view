import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getBucketUnitDom } from '../src/parts/GetBucketUnitDom/GetBucketUnitDom.ts'

test('getBucketUnitDom should render empty bucket placeholder', () => {
  const result = getBucketUnitDom(0, '0:0.5')

  expect(result).toEqual([
    {
      childCount: 0,
      className: 'ChatDebugViewTimelineBucketUnit ChatDebugViewTimelineBucketUnitEmpty',
      'data-value': '0:0.5',
      type: VirtualDomElements.Div,
    },
  ])
})

test('getBucketUnitDom should render one unit per count', () => {
  const result = getBucketUnitDom(2, '5:7')

  expect(result).toEqual([
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
  ])
})
