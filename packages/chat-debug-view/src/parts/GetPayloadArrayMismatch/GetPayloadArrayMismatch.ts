import type { ChatDebugPayloadMismatch } from '../ChatDebugPayloadMismatch/ChatDebugPayloadMismatch.ts'
import type { PayloadMismatchResolver } from '../PayloadMismatchResolver/PayloadMismatchResolver.ts'
import { createPayloadMismatch } from '../CreatePayloadMismatch/CreatePayloadMismatch.ts'
import { formatPayloadValue } from '../FormatPayloadValue/FormatPayloadValue.ts'

export const getPayloadArrayMismatch = (
  actual: unknown,
  expected: readonly unknown[],
  path: string,
  getMismatch: PayloadMismatchResolver,
): ChatDebugPayloadMismatch | undefined => {
  if (!Array.isArray(actual)) {
    return createPayloadMismatch(actual, expected, path, `Expected ${path} to be an array but got ${formatPayloadValue(actual)}`)
  }
  if (actual.length < expected.length) {
    return createPayloadMismatch(actual, expected, path, `Expected ${path} to have at least ${expected.length} items but got ${actual.length}`)
  }
  for (let index = 0; index < expected.length; index++) {
    const mismatch = getMismatch(actual[index], expected[index], `${path}[${index}]`)
    if (mismatch) {
      return mismatch
    }
  }
  return undefined
}