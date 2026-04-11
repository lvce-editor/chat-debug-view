import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getTableSummaryDom } from '../src/parts/GetTableSummaryDom/GetTableSummaryDom.ts'

test('getTableSummaryDom should render a status region with the summary text', () => {
  const result = getTableSummaryDom('2 events, 2.5s from start to finish')

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewTableSummary',
      role: 'status',
      type: VirtualDomElements.Div,
    },
    text('2 events, 2.5s from start to finish'),
  ])
})

test('getTableSummaryDom should reuse the static summary wrapper node', () => {
  const first = getTableSummaryDom('first')
  const second = getTableSummaryDom('second')

  expect(first[0]).toBe(second[0])
  expect(first[1]).not.toBe(second[1])
})
