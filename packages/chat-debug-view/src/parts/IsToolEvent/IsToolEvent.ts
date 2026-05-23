import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const toolEventTypePrefix = 'tool-execution'
const toolRequestResponseEventType = 'tool-request-response'

export const isToolEvent = (event: ChatViewEvent): boolean => {
  return event.type.startsWith(toolEventTypePrefix) || event.type === toolRequestResponseEventType
}
