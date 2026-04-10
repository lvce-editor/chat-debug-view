import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getPayloadEvent } from '../GetPayloadEvent/GetPayloadEvent.ts'
import { getPreviewMessageText } from '../GetPreviewMessageText/GetPreviewMessageText.ts'
import { getPreviewName } from '../GetPreviewName/GetPreviewName.ts'

const getWriteFilePreviewText = (event: ChatViewEvent, name: string | undefined): string | undefined => {
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

export const getPreviewEvent = (event: ChatViewEvent): unknown => {
  const previewMessageText = getPreviewMessageText(event)
  if (previewMessageText !== undefined) {
    return previewMessageText
  }
  const name = getPreviewName(event)
  const writeFilePreviewText = getWriteFilePreviewText(event, name)
  if (writeFilePreviewText !== undefined) {
    return writeFilePreviewText
  }
  return getPayloadEvent(event)
}
