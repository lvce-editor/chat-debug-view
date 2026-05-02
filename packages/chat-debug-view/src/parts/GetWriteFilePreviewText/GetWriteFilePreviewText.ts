import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { WriteFilePreview } from '../WriteFilePreview/WriteFilePreview.ts'

export const getWriteFilePreviewText = (event: ChatViewEvent, name: string | undefined): WriteFilePreview | undefined => {
  if (name !== 'write_file') {
    return undefined
  }
  const { arguments: toolArguments } = event as { readonly arguments?: unknown }
  if (
    typeof toolArguments !== 'object' ||
    toolArguments === null ||
    !Object.hasOwn(toolArguments, 'content') ||
    !Object.hasOwn(toolArguments, 'uri')
  ) {
    return undefined
  }
  const { content, uri } = toolArguments as { readonly content?: unknown; readonly uri?: unknown }
  if (typeof content !== 'string' || typeof uri !== 'string') {
    return undefined
  }
  return {
    content,
    previewType: 'write-file',
    uri,
  }
}
