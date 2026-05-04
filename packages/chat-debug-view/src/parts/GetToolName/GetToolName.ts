import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getToolName = (event: ChatViewEvent): string | undefined => {
  if (typeof event.toolName === 'string' && event.toolName) {
    return event.toolName
  }
  if (typeof event.name === 'string' && event.name) {
    return event.name
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
