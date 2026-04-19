import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getResponseEvent = (event: ChatViewEvent): unknown => {
  const { responseEvent } = event as {
    readonly responseEvent?: unknown
  }
  if (responseEvent && typeof responseEvent === 'object' && typeof (responseEvent as ChatViewEvent).type === 'string') {
    const mergedResponseEvent = responseEvent as ChatViewEvent & {
      readonly value?: unknown
    }
    if (mergedResponseEvent.value !== undefined) {
      return mergedResponseEvent.value
    }
    return responseEvent
  }
  return event
}
