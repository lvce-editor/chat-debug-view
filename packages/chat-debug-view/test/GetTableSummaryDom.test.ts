import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getTableSummaryDom } from '../src/parts/GetTableSummaryDom/GetTableSummaryDom.ts'

test('getTableSummaryDom should render a status region with the summary text', () => {
  const result = getTableSummaryDom('2 events, 2.5s from start to finish')

  expect(result).toEqual([
    {
      'aria-label': '2 events, 2.5s from start to finish',
      childCount: 2,
      className: 'TableSummary',
      role: 'status',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'TableSummaryItem',
      type: VirtualDomElements.Span,
    },
    text('2 events'),
    {
      childCount: 1,
      className: 'TableSummaryItem',
      type: VirtualDomElements.Span,
    },
    text('2.5s from start to finish'),
  ])
})

test('getTableSummaryDom should keep single-part summaries as a single item', () => {
  const result = getTableSummaryDom('first')

  expect(result).toEqual([
    {
      'aria-label': 'first',
      childCount: 1,
      className: 'TableSummary',
      role: 'status',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'TableSummaryItem',
      type: VirtualDomElements.Span,
    },
    text('first'),
  ])
})
