import { expect, test } from '@jest/globals'
import { getPayloadPrimitiveMismatch } from '../src/parts/GetPayloadPrimitiveMismatch/GetPayloadPrimitiveMismatch.ts'

test('getPayloadPrimitiveMismatch should return mismatch for different primitive values', () => {
  expect(getPayloadPrimitiveMismatch('hello', 'goodbye', 'payload.value')).toEqual({
    actual: 'hello',
    expected: 'goodbye',
    message: 'Expected payload.value to equal "goodbye" but got "hello"',
    path: 'payload.value',
  })
})

test('getPayloadPrimitiveMismatch should return undefined for equal primitive values', () => {
  expect(getPayloadPrimitiveMismatch('hello', 'hello', 'payload.value')).toBeUndefined()
})
