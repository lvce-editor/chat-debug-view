import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getCellTypeDom } from '../src/parts/GetCellTypeDom/GetCellTypeDom.ts'

test('getCellTypeDom should render the type cell', () => {
  const event = {
    eventId: 1,
    sessionId: 'session-1',
    subType: 'write_file',
    timestamp: '2026-04-02T07:26:35.172Z',
    type: 'tool-request-response',
  }

  const result = getCellTypeDom(event)

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('write_file'),
  ])
})
