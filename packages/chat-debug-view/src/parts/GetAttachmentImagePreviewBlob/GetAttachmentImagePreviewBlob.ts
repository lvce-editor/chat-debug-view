import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const getAttachmentImagePreviewBlob = (event: ChatViewEvent): Blob | undefined => {
  const { blob } = event
  if (
    typeof blob === 'object' &&
    blob !== null &&
    typeof (blob as Blob).arrayBuffer === 'function' &&
    typeof (blob as Blob).slice === 'function' &&
    typeof (blob as Blob).type === 'string'
  ) {
    return blob as Blob
  }
  return undefined
}
