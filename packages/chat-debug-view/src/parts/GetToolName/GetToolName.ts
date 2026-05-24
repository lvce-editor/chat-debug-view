type ToolNameEvent = {
  readonly [key: string]: unknown
  readonly type: string
}

export const getToolName = (event: ToolNameEvent): string | undefined => {
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
