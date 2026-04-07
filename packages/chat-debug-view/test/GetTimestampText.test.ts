import { expect, test } from '@jest/globals'
import { getTimestampText } from '../src/parts/GetTimestampText/GetTimestampText.ts'

test('getTimestampText should format valid ISO timestamp strings', () => {
  expect(getTimestampText('2026-03-08T00:00:01.250Z')).toBe('Mar 08, 2026, 00:00:01.250 UTC')
})

test('getTimestampText should format valid numeric timestamps', () => {
  expect(getTimestampText(1_772_928_001_250)).toBe('Mar 08, 2026, 00:00:01.250 UTC')
})

test('getTimestampText should return invalid timestamp strings unchanged', () => {
  expect(getTimestampText('not-a-timestamp')).toBe('not-a-timestamp')
})

test('getTimestampText should return dash for unsupported values', () => {
  expect(getTimestampText(undefined)).toBe('-')
})
