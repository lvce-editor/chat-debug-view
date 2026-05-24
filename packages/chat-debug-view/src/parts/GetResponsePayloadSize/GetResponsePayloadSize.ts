import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const encoder = new TextEncoder()

const getEndValuePayload = (event: ChatViewEvent): unknown => {
  const { endValue } = event as {
    readonly endValue?: {
      readonly value?: unknown
    }
  }
  return endValue?.value
}

const getResponsePayload = (event: ChatViewEvent): unknown => {
  const endValuePayload = getEndValuePayload(event)
  if (endValuePayload !== undefined) {
    return endValuePayload
  }
  if ('value' in event && event.value !== undefined) {
    return event.value
  }
  if ('response' in event && event.response !== undefined) {
    return event.response
  }
  return undefined
}

const getPayloadText = (payload: unknown): string => {
  if (typeof payload === 'string') {
    return payload
  }
  const serialized = JSON.stringify(payload)
  return serialized ?? ''
}

export const getResponsePayloadSize = (event: ChatViewEvent): number => {
  if (event && typeof event.size === 'number' && event.size > 0) {
    return event.size
  }
  const payload = getResponsePayload(event)
  if (payload === undefined) {
    return 0
  }
  try {
    return encoder.encode(getPayloadText(payload)).length
  } catch {
    return 0
  }
}
