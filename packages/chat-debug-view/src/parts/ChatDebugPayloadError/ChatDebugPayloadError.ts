import type { ChatDebugPayloadMismatch } from '../ChatDebugPayloadMismatch/ChatDebugPayloadMismatch.ts'

export class ChatDebugPayloadError extends Error {
  public readonly actual: unknown
  public readonly expected: unknown
  public readonly path: string

  public constructor(mismatch: ChatDebugPayloadMismatch) {
    super(mismatch.message)
    this.name = 'ChatDebugPayloadError'
    this.actual = mismatch.actual
    this.expected = mismatch.expected
    this.path = mismatch.path
  }
}