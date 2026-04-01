import { expect, test } from '@jest/globals'
import * as IsTimeValue from '../src/parts/IsTimeValue/IsTimeValue.ts'

test('isTimeValue should return true for numbers and strings', () => {
  expect(IsTimeValue.isTimeValue(1)).toBe(true)
  expect(IsTimeValue.isTimeValue('2026-01-01T00:00:00.000Z')).toBe(true)
})

test('isTimeValue should return false for undefined', () => {
  expect(IsTimeValue.isTimeValue(undefined)).toBe(false)
})
