export interface ChatViewEvent {
  readonly [key: string]: unknown
  readonly duration?: number
  readonly durationMs?: number
  readonly endTime?: number | string
  readonly ended?: number | string
  readonly eventId?: number
  readonly sessionId?: string
  readonly startTime?: number | string
  readonly started?: number | string
  readonly timestamp?: number | string
  readonly type: string
}
