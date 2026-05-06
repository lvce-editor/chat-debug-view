import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const isHeadersRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export const hasHeadersDetails = (event: ChatViewEvent): boolean => {
  return event.type === 'ai-request' && isHeadersRecord(event.headers)
}