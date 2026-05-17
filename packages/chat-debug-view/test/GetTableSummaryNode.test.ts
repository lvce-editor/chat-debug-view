import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getTableSummaryNode } from '../src/parts/GetTableSummaryNode/GetTableSummaryNode.ts'

test('getTableSummaryNode should render a status node with the requested child count', () => {
  expect(getTableSummaryNode(3)).toEqual({
    childCount: 3,
    className: 'TableSummary',
    role: 'status',
    type: VirtualDomElements.Div,
  })
})

test('getTableSummaryNode should reuse the cached node for the same child count', () => {
  const first = getTableSummaryNode(3)
  const second = getTableSummaryNode(3)

  expect(first).toBe(second)
})

test('getTableSummaryNode should create a new node for a different child count', () => {
  const first = getTableSummaryNode(1)
  const second = getTableSummaryNode(3)

  expect(first).not.toBe(second)
})
