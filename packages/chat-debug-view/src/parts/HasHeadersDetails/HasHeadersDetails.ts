import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const isHeadersRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export const hasHeadersDetails = (event: ChatViewEvent): boolean => {
  const { requestEvent } = event as {
    readonly requestEvent?: unknown
  }
  if (event.type === 'ai-request-finished' && isHeadersRecord(requestEvent) && isHeadersRecord(requestEvent.headers)) {
    return true
  }
  return event.type === 'ai-request' && isHeadersRecord(event.headers)
}
