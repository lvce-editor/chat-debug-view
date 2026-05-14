import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getHeaderRowNodes } from '../src/parts/GetHeaderRowNodes/GetHeaderRowNodes.ts'

test('getHeaderRowNodes should return odd row class for even index', () => {
  const result = getHeaderRowNodes(
    {
      key: 'Server',
      value: 'test',
    },
    0,
  )
  expect(result).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugViewHeadersRow ChatDebugViewHeadersRowOdd',
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellName',
      type: VirtualDomElements.Div,
    },
    text('Server'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersCell ChatDebugViewHeadersCellValue',
      type: VirtualDomElements.Div,
    },
    text('test'),
  ])
})

test('getHeaderRowNodes should return even row class for odd index', () => {
  const result = getHeaderRowNodes(
    {
      key: 'Server',
      value: 'test',
    },
    1,
  )
  expect(result[0]).toEqual({
    childCount: 2,
    className: 'ChatDebugViewHeadersRow ChatDebugViewHeadersRowEven',
    type: VirtualDomElements.Li,
  })
})
