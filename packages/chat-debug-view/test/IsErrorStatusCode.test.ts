import { expect, test } from '@jest/globals'
import { isErrorStatusCode } from '../src/parts/IsErrorStatusCode/IsErrorStatusCode.ts'

test('isErrorStatusCode should return true for numeric codes >= 400', () => {
  expect(isErrorStatusCode(400)).toBe(true)
  expect(isErrorStatusCode(500)).toBe(true)
})

test('isErrorStatusCode should return true for string codes >= 400', () => {
  expect(isErrorStatusCode('404')).toBe(true)
})

test('isErrorStatusCode should return false for non-error values', () => {
  expect(isErrorStatusCode(204)).toBe(false)
  expect(isErrorStatusCode('ok')).toBe(false)
  expect(isErrorStatusCode(undefined)).toBe(false)
})
