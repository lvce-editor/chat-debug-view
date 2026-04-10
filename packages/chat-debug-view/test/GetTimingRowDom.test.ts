import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getTimingRowDom } from '../src/parts/GetTimingRowDom/GetTimingRowDom.ts'

test('getTimingRowDom should render label and value cells', () => {
  const result = getTimingRowDom('Started', 'Mar 08, 2026, 00:00:01.000 UTC')

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugViewTimingRow',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewTimingLabel',
      type: VirtualDomElements.Span,
    },
    text('Started'),
    {
      childCount: 1,
      className: 'ChatDebugViewTimingValue',
      type: VirtualDomElements.Span,
    },
    text('Mar 08, 2026, 00:00:01.000 UTC'),
  ])
})

test('getTimingRowDom should reuse static row wrapper nodes', () => {
  const first = getTimingRowDom('Started', '1')
  const second = getTimingRowDom('Ended', '2')

  expect(first[0]).toBe(second[0])
  expect(first[1]).toBe(second[1])
  expect(first[2]).not.toBe(second[2])
  expect(first[3]).toBe(second[3])
  expect(first[4]).not.toBe(second[4])
})
