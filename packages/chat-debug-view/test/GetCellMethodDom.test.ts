import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getCellMethodDom } from '../src/parts/GetCellMethodDom/GetCellMethodDom.ts'

test('getCellMethodDom should render the method cell', () => {
  const event = {
    eventId: 1,
    name: 'read_file',
    sessionId: 'session-1',
    subType: 'tool-execution',
    timestamp: '2026-04-02T07:26:35.172Z',
    type: 'tool-execution',
  }

  const result = getCellMethodDom(event)

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('GET'),
  ])
})
