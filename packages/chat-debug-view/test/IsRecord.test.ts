import { expect, test } from '@jest/globals'
import { isRecord } from '../src/parts/IsRecord/IsRecord.ts'

test('isRecord should return true for plain objects', () => {
  expect(isRecord({ status: 500 })).toBe(true)
})

test('isRecord should return false for null and primitives', () => {
  expect(isRecord(null)).toBe(false)
  expect(isRecord('error')).toBe(false)
  expect(isRecord(42)).toBe(false)
})
