import { expect, test } from '@jest/globals'
import * as GetEndTime from '../src/parts/GetEndTime/GetEndTime.ts'

test('getEndTime should prefer ended over endTime and timestamp', () => {
  const result = GetEndTime.getEndTime({
    ended: '2026-01-01T00:00:02.000Z',
    endTime: '2026-01-01T00:00:01.000Z',
    timestamp: '2026-01-01T00:00:00.000Z',
    type: 'request',
  })

  expect(result).toBe('2026-01-01T00:00:02.000Z')
})

test('getEndTime should fall back to timestamp', () => {
  const result = GetEndTime.getEndTime({
    timestamp: '2026-01-01T00:00:00.000Z',
    type: 'request',
  })

  expect(result).toBe('2026-01-01T00:00:00.000Z')
})
