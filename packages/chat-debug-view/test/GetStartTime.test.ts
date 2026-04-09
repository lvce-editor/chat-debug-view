import { expect, test } from '@jest/globals'
import * as GetStartTime from '../src/parts/GetStartTime/GetStartTime.ts'

test('getStartTime should prefer started over startTime and timestamp', () => {
  const result = GetStartTime.getStartTime({
    eventId: 1,
    started: '2026-01-01T00:00:00.000Z',
    startTime: '2026-01-01T00:00:01.000Z',
    timestamp: '2026-01-01T00:00:02.000Z',
    type: 'request',
  })

  expect(result).toBe('2026-01-01T00:00:00.000Z')
})

test('getStartTime should fall back to timestamp', () => {
  const result = GetStartTime.getStartTime({
    eventId: 1,
    timestamp: '2026-01-01T00:00:00.000Z',
    type: 'request',
  })

  expect(result).toBe('2026-01-01T00:00:00.000Z')
})
