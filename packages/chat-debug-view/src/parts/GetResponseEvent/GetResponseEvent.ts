import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const getEndValueResponseData = (event: ChatViewEvent): unknown => {
  const endValue = event.endValue as
    | {
        readonly value?: unknown
      }
    | undefined
  if (!endValue || endValue.value === undefined) {
    return undefined
  }
  return endValue.value
}

const getMergedResponseData = (event: ChatViewEvent): unknown => {
  const { responseEvent } = event as {
    readonly responseEvent?: unknown
  }
  if (!responseEvent || typeof responseEvent !== 'object' || typeof (responseEvent as ChatViewEvent).type !== 'string') {
    return undefined
  }
  const mergedResponseEvent = responseEvent as ChatViewEvent & {
    readonly value?: unknown
  }
  if (mergedResponseEvent.value !== undefined) {
    return mergedResponseEvent.value
  }
  return responseEvent
}

export const getResponseData = (event: ChatViewEvent): unknown => {
  const endValueResponseData = getEndValueResponseData(event)
  if (endValueResponseData !== undefined) {
    return endValueResponseData
  }
  return getMergedResponseData(event)
}

export const getResponseEvent = (event: ChatViewEvent): unknown => {
  const responseData = getResponseData(event)
  if (responseData !== undefined) {
    return responseData
  }
  return event
}
