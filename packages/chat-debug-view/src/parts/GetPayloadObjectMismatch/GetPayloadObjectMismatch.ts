import type { ChatDebugPayloadMismatch } from '../ChatDebugPayloadMismatch/ChatDebugPayloadMismatch.ts'
import type { PayloadMismatchResolver } from '../PayloadMismatchResolver/PayloadMismatchResolver.ts'
import { createPayloadMismatch } from '../CreatePayloadMismatch/CreatePayloadMismatch.ts'
import { formatPayloadValue } from '../FormatPayloadValue/FormatPayloadValue.ts'
import { isPayloadObject } from '../IsPayloadObject/IsPayloadObject.ts'

export const getPayloadObjectMismatch = (
  actual: unknown,
  expected: Readonly<Record<string, unknown>>,
  path: string,
  getMismatch: PayloadMismatchResolver,
): ChatDebugPayloadMismatch | undefined => {
  if (!isPayloadObject(actual)) {
    return createPayloadMismatch(actual, expected, path, `Expected ${path} to be an object but got ${formatPayloadValue(actual)}`)
  }
  for (const key of Object.keys(expected)) {
    if (!Object.hasOwn(actual, key)) {
      return createPayloadMismatch(actual[key], expected[key], `${path}.${key}`, `Expected ${path}.${key} to exist`)
    }
    const mismatch = getMismatch(actual[key], expected[key], `${path}.${key}`)
    if (mismatch) {
      return mismatch
    }
  }
  return undefined
}
