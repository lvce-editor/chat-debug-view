import { expect, test } from '@jest/globals'
import { getPayloadObjectMismatch } from '../src/parts/GetPayloadObjectMismatch/GetPayloadObjectMismatch.ts'

test('getPayloadObjectMismatch should return mismatch when actual value is not an object', () => {
  const mismatch = getPayloadObjectMismatch('hello', { input: 'hello' }, 'payload', () => {
    throw new Error('unexpected recursive call')
  })

  expect(mismatch).toEqual({
    actual: 'hello',
    expected: { input: 'hello' },
    message: 'Expected payload to be an object but got "hello"',
    path: 'payload',
  })
})

test('getPayloadObjectMismatch should return mismatch when expected property is missing', () => {
  const mismatch = getPayloadObjectMismatch({ input: 'hello' }, { missing: true }, 'payload', () => {
    throw new Error('unexpected recursive call')
  })

  expect(mismatch).toEqual({
    actual: undefined,
    expected: true,
    message: 'Expected payload.missing to exist',
    path: 'payload.missing',
  })
})

test('getPayloadObjectMismatch should return first nested mismatch', () => {
  const mismatch = getPayloadObjectMismatch({ input: 'hello' }, { input: 'goodbye' }, 'payload', (actual, expected, path) => {
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
    message: 'Expected payload.input to match',
    path: 'payload.input',
  })
})