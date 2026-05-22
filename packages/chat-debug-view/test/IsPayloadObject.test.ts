import { expect, test } from '@jest/globals'
import { isPayloadObject } from '../src/parts/IsPayloadObject/IsPayloadObject.ts'

test('isPayloadObject should return true for plain objects', () => {
  expect(isPayloadObject({ ok: true })).toBe(true)
})

test('isPayloadObject should return false for arrays', () => {
  expect(isPayloadObject(['x'])).toBe(false)
})

test('isPayloadObject should return false for null', () => {
  expect(isPayloadObject(null)).toBe(false)
})
