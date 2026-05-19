import { expect, test } from '@jest/globals'
import { formatTimestamp } from '../src/parts/FormatTimestamp/FormatTimestamp.ts'

test('formatTimestamp should format UTC timestamps with milliseconds', () => {
  const result = formatTimestamp(new Date('2026-03-08T00:00:01.250Z'))

  expect(result).toBe('Mar 08, 2026, 00:00:01.250 UTC')
})

test('formatTimestamp should zero-pad UTC date and time parts', () => {
  const result = formatTimestamp(new Date('2026-01-02T03:04:05.006Z'))

  expect(result).toBe('Jan 02, 2026, 03:04:05.006 UTC')
})
