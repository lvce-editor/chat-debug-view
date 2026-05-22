export type ChatDebugPayloadMismatch = {
  readonly actual: unknown
  readonly expected: unknown
  readonly message: string
  readonly path: string
}
