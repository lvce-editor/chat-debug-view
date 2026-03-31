import { expect, test } from '@jest/globals'
import * as ToTimeNumber from '../src/parts/ToTimeNumber/ToTimeNumber.ts'

test('toTimeNumber should return finite numbers as-is', () => {
  const result = ToTimeNumber.toTimeNumber(42)
  expect(result).toBe(42)
})

test('toTimeNumber should parse ISO timestamps', () => {
  const result = ToTimeNumber.toTimeNumber('2026-01-01T10:00:00.000Z')
  expect(result).toBe(1767261600000)
})

test('toTimeNumber should return undefined for invalid values', () => {
  const result = ToTimeNumber.toTimeNumber('not-a-date')
  expect(result).toBeUndefined()
})
