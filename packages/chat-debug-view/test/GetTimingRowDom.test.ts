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
