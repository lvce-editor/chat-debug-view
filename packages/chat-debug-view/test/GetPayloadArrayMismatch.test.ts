import { expect, test } from '@jest/globals'
import { getPayloadArrayMismatch } from '../src/parts/GetPayloadArrayMismatch/GetPayloadArrayMismatch.ts'

test('getPayloadArrayMismatch should return mismatch when actual value is not an array', () => {
  const mismatch = getPayloadArrayMismatch('hello', ['hello'], 'payload.items', () => {
    throw new Error('unexpected recursive call')
  })

  expect(mismatch).toEqual({
    actual: 'hello',
    expected: ['hello'],
    message: 'Expected payload.items to be an array but got "hello"',
    path: 'payload.items',
  })
})

test('getPayloadArrayMismatch should return mismatch when actual array is too short', () => {
  const mismatch = getPayloadArrayMismatch(['hello'], ['hello', 'extra'], 'payload.items', () => {
    throw new Error('unexpected recursive call')
  })

  expect(mismatch).toEqual({
    actual: ['hello'],
    expected: ['hello', 'extra'],
    message: 'Expected payload.items to have at least 2 items but got 1',
    path: 'payload.items',
  })
})

test('getPayloadArrayMismatch should return first nested mismatch', () => {
  const mismatch = getPayloadArrayMismatch(['hello'], ['goodbye'], 'payload.items', (actual, expected, path) => {
    return actual === expected
      ? undefined
      : {
          actual,
          expected,
          message: `Expected ${path} to match`,
          path,
        }
  })

  expect(mismatch).toEqual({
    actual: 'hello',
    expected: 'goodbye',
    message: 'Expected payload.items[0] to match',
    path: 'payload.items[0]',
  })
})