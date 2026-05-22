import type { ChatDebugPayloadMismatch } from '../ChatDebugPayloadMismatch/ChatDebugPayloadMismatch.ts'
import { getPayloadArrayMismatch } from '../GetPayloadArrayMismatch/GetPayloadArrayMismatch.ts'
import { getPayloadObjectMismatch } from '../GetPayloadObjectMismatch/GetPayloadObjectMismatch.ts'
import { getPayloadPrimitiveMismatch } from '../GetPayloadPrimitiveMismatch/GetPayloadPrimitiveMismatch.ts'
import { isPayloadObject } from '../IsPayloadObject/IsPayloadObject.ts'

export const getPayloadMismatch = (
  actual: unknown,
  expected: unknown,
  path = 'payload',
): ChatDebugPayloadMismatch | undefined => {
  if (Array.isArray(expected)) {
    return getPayloadArrayMismatch(actual, expected, path, getPayloadMismatch)
  }
  if (isPayloadObject(expected)) {
    return getPayloadObjectMismatch(actual, expected, path, getPayloadMismatch)
  }
  return getPayloadPrimitiveMismatch(actual, expected, path)
}