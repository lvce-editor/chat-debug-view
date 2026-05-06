import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getNextSiblingIndex } from '../src/parts/GetNextSiblingIndex/GetNextSiblingIndex.ts'

test('getNextSiblingIndex should return the next node index for leaf nodes', () => {
  const result = getNextSiblingIndex(
    [
      {
        childCount: 0,
        type: VirtualDomElements.Div,
      },
      {
        childCount: 0,
        type: VirtualDomElements.Div,
      },
    ],
    0,
  )

  expect(result).toBe(1)
})

test('getNextSiblingIndex should skip nested descendants', () => {
  const result = getNextSiblingIndex(
    [
      {
        childCount: 2,
        type: VirtualDomElements.Div,
      },
      {
        childCount: 1,
        type: VirtualDomElements.Div,
      },
      {
        childCount: 0,
        type: VirtualDomElements.Span,
      },
      {
        childCount: 0,
        type: VirtualDomElements.Div,
      },
    ],
    0,
  )

  expect(result).toBe(4)
})
