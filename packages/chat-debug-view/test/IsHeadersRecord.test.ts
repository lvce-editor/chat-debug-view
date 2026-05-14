import { expect, test } from '@jest/globals'
import { isHeadersRecord } from '../src/parts/IsHeadersRecord/IsHeadersRecord.ts'

test('isHeadersRecord should return true for plain objects', () => {
  expect(isHeadersRecord({ foo: 1 })).toBe(true)
})

test('isHeadersRecord should return false for non objects', () => {
  expect(isHeadersRecord(null)).toBe(false)
  expect(isHeadersRecord(undefined)).toBe(false)
  expect(isHeadersRecord([])).toBe(false)
  expect(isHeadersRecord('x')).toBe(false)
})
