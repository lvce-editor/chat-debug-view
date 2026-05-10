import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getCellDurationDom } from '../src/parts/GetCellDurationDom/GetCellDurationDom.ts'

test('getCellDurationDom should render the duration cell', () => {
  const event = {
    ended: '2026-03-08T00:00:01.250Z',
    eventId: 1,
    sessionId: 'session-1',
    started: '2026-03-08T00:00:01.000Z',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'tool-execution',
  }

  const result = getCellDurationDom(event)

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Td,
    },
    text('250 ms'),
  ])
})
