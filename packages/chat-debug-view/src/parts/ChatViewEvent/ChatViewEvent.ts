export interface ChatViewEvent {
  readonly duration?: number
  readonly durationMs?: number
  readonly ended?: number | string
  readonly endTime?: number | string
  readonly eventId: number
  readonly method?: string
  readonly [key: string]: unknown
  readonly sessionId?: string
  readonly size?: number
  readonly started?: number | string
  readonly startTime?: number | string
  readonly status?: number | string
  readonly subType?: string
  readonly time?: string
  readonly timestamp?: number | string
  readonly type: string
}
