import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getCellStatusDom } from '../src/parts/GetCellStatusDom/GetCellStatusDom.ts'

test('getCellStatusDom should render the error status cell', () => {
  const event = {
    error: 'Invalid argument: uri must be an absolute URI.',
    eventId: 1,
    name: 'list_files',
    sessionId: 'session-1',
    subType: 'tool-execution',
    timestamp: '2026-04-02T07:26:35.172Z',
    type: 'tool-execution',
  }

  const result = getCellStatusDom(event, true)

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellStatusError',
      type: VirtualDomElements.Td,
    },
    text('400'),
  ])
})
