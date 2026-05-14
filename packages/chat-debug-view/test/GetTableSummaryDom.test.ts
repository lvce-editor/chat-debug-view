import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getTableSummaryDom } from '../src/parts/GetTableSummaryDom/GetTableSummaryDom.ts'

test('getTableSummaryDom should render a status region with summary items and a separator', () => {
  const result = getTableSummaryDom(['2 requests', 'Finish 2.5s'])

  expect(result).toEqual([
    {
      childCount: 3,
      className: 'TableSummary',
      role: 'status',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Span,
    },
    text('2 requests'),
    text(' | '),
    {
      childCount: 1,
      type: VirtualDomElements.Span,
    },
    text('Finish 2.5s'),
  ])
})

test('getTableSummaryDom should reuse the static summary wrapper node', () => {
  const first = getTableSummaryDom(['first', 'second'])
  const second = getTableSummaryDom(['third', 'fourth'])

  expect(first[0]).toBe(second[0])
  expect(first[2]).not.toBe(second[2])
})
