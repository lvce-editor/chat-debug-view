import type { ChatDebugPayloadMismatch } from '../ChatDebugPayloadMismatch/ChatDebugPayloadMismatch.ts'

export type PayloadMismatchResolver = (actual: unknown, expected: unknown, path: string) => ChatDebugPayloadMismatch | undefined
