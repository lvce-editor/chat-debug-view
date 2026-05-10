import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getTableCellDom } from '../src/parts/GetTableCellDom/GetTableCellDom.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('getTableCellDom should render a method cell', () => {
  const event = {
    eventId: 1,
    name: 'read_file',
    sessionId: 'session-1',
    timestamp: '2026-04-02T07:26:35.172Z',
    type: 'tool-execution',
  }

  const result = getTableCellDom(TableColumn.Method, event, false)

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('GET'),
  ])
})

test('getTableCellDom should return an empty array for unknown columns', () => {
  const event = {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-04-02T07:26:35.172Z',
    type: 'tool-execution',
  }

  const result = getTableCellDom('unknown-column' as TableColumn.TableColumnName, event, false)

  expect(result).toEqual([])
})
