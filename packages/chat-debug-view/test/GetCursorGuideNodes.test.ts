import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getCursorGuideNodes } from '../src/parts/GetCursorGuideNodes/GetCursorGuideNodes.ts'

test('getCursorGuideNodes should return no nodes when hover position is missing', () => {
  expect(getCursorGuideNodes(null)).toEqual([])
})

test('getCursorGuideNodes should render a cursor guide marker when hover position exists', () => {
  expect(getCursorGuideNodes(37.5)).toEqual([
    {
      childCount: 0,
      className: 'ChatDebugViewTimelineCursorGuide ChatDebugViewTimelineCursorGuideVisible',
      style: 'left:37.5%;',
      type: VirtualDomElements.Div,
    },
  ])
})
