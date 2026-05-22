import { expect, test } from '@jest/globals'
import { getPayloadMismatch } from '../src/parts/GetPayloadMismatch/GetPayloadMismatch.ts'

test('getPayloadMismatch should return structured mismatch info without throwing', () => {
  const mismatch = getPayloadMismatch(
    {
      arguments: {
        input: ['hello'],
      },
    },
    {
      arguments: {
        input: ['goodbye'],
      },
    },
  )

  expect(mismatch).toEqual({
    actual: 'hello',
    expected: 'goodbye',
    message: 'Expected payload.arguments.input[0] to equal "goodbye" but got "hello"',
    path: 'payload.arguments.input[0]',
  })
})

test('getPayloadMismatch should return undefined when payload matches expected subset', () => {
  const mismatch = getPayloadMismatch(
    {
      arguments: {
        input: ['hello', 'extra'],
        nested: {
          ok: true,
        },
      },
    },
    {
      arguments: {
        input: ['hello'],
        nested: {
          ok: true,
        },
      },
    },
  )

  expect(mismatch).toBeUndefined()
})