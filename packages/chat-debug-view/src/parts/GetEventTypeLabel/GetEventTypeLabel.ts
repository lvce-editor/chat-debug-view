import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getToolName } from '../GetToolName/GetToolName.ts'

const toolExecutionTypePrefix = 'tool-execution'

export const getEventTypeLabel = (event: ChatViewEvent): string => {
  if (!event.type.startsWith(toolExecutionTypePrefix)) {
    return event.type
  }
  const toolName = getToolName(event)
  if (!toolName) {
    return event.type
  }
  return `${event.type}, ${toolName}`
}
