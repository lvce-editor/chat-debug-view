import { expect, test } from '@jest/globals'
import { formatImageStats } from '../src/parts/FormatImageStats/FormatImageStats.ts'

test('formatImageStats should combine dimensions and byte size', () => {
  expect(formatImageStats(24, 18, 512)).toBe('24 × 18 px · 512 B')
})
