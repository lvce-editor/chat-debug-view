import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getSelectionNodesDom } from '../src/parts/GetSelectionNodesDom/GetSelectionNodesDom.ts'

test('getSelectionNodesDom should return empty array when selection is incomplete', () => {
  const result = getSelectionNodesDom(true, 25, null)

  expect(result).toEqual([])
})

test('getSelectionNodesDom should render selection range and markers', () => {
  const result = getSelectionNodesDom(true, 25, 75)

  expect(result).toEqual([
    {
      childCount: 0,
      className: 'ChatDebugViewTimelineSelectionRange',
      style: 'left:25%;width:50%;',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewTimelineSelectionMarker ChatDebugViewTimelineSelectionMarkerStart',
      style: 'left:25%;',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewTimelineSelectionMarker ChatDebugViewTimelineSelectionMarkerEnd',
      style: 'left:75%;',
      type: VirtualDomElements.Div,
    },
  ])
})
