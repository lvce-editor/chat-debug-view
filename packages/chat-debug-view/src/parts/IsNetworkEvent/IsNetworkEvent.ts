import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const isNetworkEvent = (event: ChatViewEvent): boolean => {
  const normalizedType = event.type.toLowerCase()
  return (
    normalizedType === 'request' ||
    normalizedType === 'ai-request' ||
    normalizedType === 'ai-request-finished' ||
    normalizedType === 'response' ||
    normalizedType === 'ai-response-success' ||
    normalizedType === 'handle-response' ||
    normalizedType.includes('fetch') ||
    normalizedType.includes('xhr')
  )
}
