import type { ChatDebugPayloadMismatch } from '../ChatDebugPayloadMismatch/ChatDebugPayloadMismatch.ts'

export const createPayloadMismatch = (
  actual: unknown,
  expected: unknown,
  path: string,
  message: string,
): ChatDebugPayloadMismatch => {
  return {
    actual,
    expected,
    message,
    path,
  }
}