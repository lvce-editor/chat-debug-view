import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const toolExecutionTypePrefix = 'tool-execution'

export const getEventTypeLabel = (event: ChatViewEvent): string => {
  if (!event.type.startsWith(toolExecutionTypePrefix)) {
    return event.type
  }
  if (typeof event.toolName !== 'string' || !event.toolName) {
    return event.type
  }
  return `${event.type}, ${event.toolName}`
}
