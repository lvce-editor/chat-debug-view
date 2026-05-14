import { expect, test } from '@jest/globals'
import { isNonEmptyString } from '../src/parts/IsNonEmptyString/IsNonEmptyString.ts'

test('isNonEmptyString should return true for non-empty strings', () => {
  expect(isNonEmptyString('x')).toBe(true)
})

test('isNonEmptyString should return false for empty and non-string values', () => {
  expect(isNonEmptyString('')).toBe(false)
  expect(isNonEmptyString(1)).toBe(false)
  expect(isNonEmptyString(null)).toBe(false)
})
