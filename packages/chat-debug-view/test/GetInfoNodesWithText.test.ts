import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getInfoNodesWithText } from '../src/parts/GetInfoNodesWithText/GetInfoNodesWithText.ts'

test('getInfoNodesWithText should render a single info container with text content', () => {
  const result = getInfoNodesWithText('Info')

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersSectionInfo',
      type: VirtualDomElements.Div,
    },
    text('Info'),
  ])
})
