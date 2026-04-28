import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getSseResponseCompletedPreviewEvent = (event: ChatViewEvent): unknown => {
  if (event.type !== 'sse-response-completed') {
    return undefined
  }
  const { value } = event
  if (!value || typeof value !== 'object') {
    return undefined
  }
  const { response } = value as { readonly response?: unknown }
  if (!response || typeof response !== 'object') {
    return undefined
  }
  const { output } = response as { readonly output?: unknown }
  if (!Array.isArray(output)) {
    return undefined
  }
  return output
}
