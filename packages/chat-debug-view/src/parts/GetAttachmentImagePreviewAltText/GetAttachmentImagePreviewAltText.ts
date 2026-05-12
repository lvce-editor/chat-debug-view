import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getAttachmentImagePreviewAltText = (event: ChatViewEvent): string => {
  return typeof event.name === 'string' && event.name ? event.name : 'image preview'
}
