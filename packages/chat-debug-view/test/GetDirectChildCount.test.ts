import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getDirectChildCount } from '../src/parts/GetDirectChildCount/GetDirectChildCount.ts'

test('getDirectChildCount should count only top level nodes', () => {
  const result = getDirectChildCount([
    {
      childCount: 2,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      type: VirtualDomElements.Div,
    },
  ])

  expect(result).toBe(2)
})

test('getDirectChildCount should return zero for empty nodes', () => {
  const result = getDirectChildCount([])

  expect(result).toBe(0)
})
