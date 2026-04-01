import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const toolExecutionTypePrefix = 'tool-execution'

const getToolName = (event: ChatViewEvent): string | undefined => {
  if (typeof event.toolName === 'string' && event.toolName) {
    return event.toolName
  }
  const { arguments: toolArguments } = event
  if (!toolArguments || typeof toolArguments !== 'object') {
    return undefined
  }
  const { name } = toolArguments as {
    readonly name?: unknown
  }
  if (typeof name !== 'string' || !name) {
    return undefined
  }
  return name
}

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
