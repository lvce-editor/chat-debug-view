import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getWriteFilePreviewText = (event: ChatViewEvent, name: string | undefined): string | undefined => {
  if (name !== 'write_file') {
    return undefined
  }
  const { arguments: toolArguments } = event as { readonly arguments?: unknown }
  if (typeof toolArguments !== 'object' || toolArguments === null || !Object.hasOwn(toolArguments, 'content')) {
    return undefined
  }
  const { content } = toolArguments as { readonly content?: unknown }
  if (typeof content !== 'string') {
    return undefined
  }
  return content
}
