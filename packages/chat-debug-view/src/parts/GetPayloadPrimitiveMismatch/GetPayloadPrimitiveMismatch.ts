import type { ChatDebugPayloadMismatch } from '../ChatDebugPayloadMismatch/ChatDebugPayloadMismatch.ts'
import { createPayloadMismatch } from '../CreatePayloadMismatch/CreatePayloadMismatch.ts'
import { formatPayloadValue } from '../FormatPayloadValue/FormatPayloadValue.ts'

export const getPayloadPrimitiveMismatch = (
  actual: unknown,
  expected: unknown,
  path: string,
): ChatDebugPayloadMismatch | undefined => {
  if (!Object.is(actual, expected)) {
    return createPayloadMismatch(actual, expected, path, `Expected ${path} to equal ${formatPayloadValue(expected)} but got ${formatPayloadValue(actual)}`)
  }
  return undefined
}