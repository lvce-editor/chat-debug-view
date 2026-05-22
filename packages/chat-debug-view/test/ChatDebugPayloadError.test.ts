import { expect, test } from '@jest/globals'
import { ChatDebugPayloadError } from '../src/parts/ChatDebugPayloadError/ChatDebugPayloadError.ts'

test('ChatDebugPayloadError should expose mismatch properties', () => {
  const error = new ChatDebugPayloadError({
    actual: 'hello',
    expected: 'goodbye',
    message: 'Expected payload.value to equal "goodbye" but got "hello"',
    path: 'payload.value',
  })

  expect(error).toMatchObject({
    actual: 'hello',
    expected: 'goodbye',
    message: 'Expected payload.value to equal "goodbye" but got "hello"',
    name: 'ChatDebugPayloadError',
    path: 'payload.value',
  })
})
