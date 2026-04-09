import { expect, test } from '@jest/globals'
import { getEndText } from '../src/parts/GetEndText/GetEndText.ts'
import { getStartText } from '../src/parts/GetStartText/GetStartText.ts'

test('getStartText should prefer started over older timestamp fields', () => {
  const result = getStartText({
    eventId: 1,
    started: '2026-03-08T00:00:04.000Z',
    startTime: '2026-03-08T00:00:03.000Z',
    startTimestamp: '2026-03-08T00:00:02.000Z',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'request',
  })

  expect(result).toBe('Mar 08, 2026, 00:00:04.000 UTC')
})

test('getStartText should fall back to timestamp when no dedicated start field exists', () => {
  const result = getStartText({
    eventId: 1,
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'request',
  })

  expect(result).toBe('Mar 08, 2026, 00:00:01.000 UTC')
})

test('getEndText should prefer ended over older timestamp fields', () => {
  const result = getEndText({
    ended: '2026-03-08T00:00:04.000Z',
    endTime: '2026-03-08T00:00:03.000Z',
    endTimestamp: '2026-03-08T00:00:02.000Z',
    eventId: 1,
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'response',
  })

  expect(result).toBe('Mar 08, 2026, 00:00:04.000 UTC')
})

test('getEndText should fall back to timestamp when no dedicated end field exists', () => {
  const result = getEndText({
    eventId: 1,
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'response',
  })

  expect(result).toBe('Mar 08, 2026, 00:00:01.000 UTC')
})
