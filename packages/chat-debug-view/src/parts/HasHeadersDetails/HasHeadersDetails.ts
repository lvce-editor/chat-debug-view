import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const isHeadersRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export const hasHeadersDetails = (event: ChatViewEvent): boolean => {
  if (event.type !== 'ai-request') {
    return false
  }
  if (isHeadersRecord(event.headers)) {
    return true
  }
  return isHeadersRecord(event.endValue) && isHeadersRecord(event.endValue.headers)
}
