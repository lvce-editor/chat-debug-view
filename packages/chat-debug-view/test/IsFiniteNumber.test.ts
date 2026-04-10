import { expect, test } from '@jest/globals'
import * as IsFiniteNumber from '../src/parts/TableColumnLayout/IsFiniteNumber.ts'

test('isFiniteNumber should return true for finite numbers', () => {
  expect(IsFiniteNumber.isFiniteNumber(42)).toBe(true)
})

test('isFiniteNumber should return false for non-finite values', () => {
  expect(IsFiniteNumber.isFiniteNumber(Number.NaN)).toBe(false)
  expect(IsFiniteNumber.isFiniteNumber(Number.POSITIVE_INFINITY)).toBe(false)
  expect(IsFiniteNumber.isFiniteNumber('42')).toBe(false)
})
