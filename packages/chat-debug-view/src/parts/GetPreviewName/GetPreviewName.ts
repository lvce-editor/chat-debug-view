import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getPreviewName = (event: ChatViewEvent): string | undefined => {
  if (typeof event.name === 'string' && event.name) {
    return event.name
  }
  if (typeof event.toolName === 'string' && event.toolName) {
    return event.toolName
  }
  return undefined
}
