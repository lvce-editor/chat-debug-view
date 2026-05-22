import { expect, test } from '@jest/globals'
import { createPayloadMismatch } from '../src/parts/CreatePayloadMismatch/CreatePayloadMismatch.ts'

test('createPayloadMismatch should return mismatch info', () => {
  expect(createPayloadMismatch('actual', 'expected', 'payload.value', 'message')).toEqual({
    actual: 'actual',
    expected: 'expected',
    message: 'message',
    path: 'payload.value',
  })
})