import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getAttachmentImagePreviewMimeType = (event: ChatViewEvent): string | undefined => {
  return typeof event.mimeType === 'string' ? event.mimeType : undefined
}
