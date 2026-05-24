import { getToolName } from '../GetToolName/GetToolName.ts'

type EventLike = {
  readonly [key: string]: unknown
  readonly name?: unknown
  readonly subType?: unknown
  readonly type: string
}

const toolExecutionTypePrefix = 'tool-execution'

export const getEventSubType = (event: EventLike, fallbackType: string = event.type): string => {
  if (typeof event.subType === 'string' && event.subType) {
    return event.subType
  }
  if (fallbackType === 'tool-request-response') {
    const toolName = getToolName(event)
    if (toolName) {
      return toolName
    }
  }
  if (event.name === 'list_files') {
    return event.name
  }
  if (fallbackType.startsWith(toolExecutionTypePrefix)) {
    const toolName = getToolName(event)
    if (toolName) {
      return `${fallbackType}, ${toolName}`
    }
  }
  return fallbackType
}