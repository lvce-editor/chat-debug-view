import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getHeadersTableNodes } from '../src/parts/GetHeadersTableNodes/GetHeadersTableNodes.ts'

test('getHeadersTableNodes should return table and row nodes', () => {
  const result = getHeadersTableNodes([
    ['A', '1'],
    ['B', '2'],
  ])
  expect(result[0]).toEqual({
    childCount: 2,
    className: 'ChatDebugViewHeadersTable',
    type: VirtualDomElements.Ul,
  })
  expect(result).toContainEqual(text('A'))
  expect(result).toContainEqual(text('1'))
  expect(result).toContainEqual(text('B'))
  expect(result).toContainEqual(text('2'))
})