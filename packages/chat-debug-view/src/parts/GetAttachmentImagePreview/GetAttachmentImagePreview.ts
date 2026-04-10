import type { AttachmentImagePreview } from '../AttachmentImagePreview/AttachmentImagePreview.ts'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'

const getBlob = (event: ChatViewEvent): Blob | undefined => {
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

const getMimeType = (event: ChatViewEvent): string | undefined => {
  return typeof event.mimeType === 'string' ? event.mimeType : undefined
}

const getAltText = (event: ChatViewEvent): string => {
  return typeof event.name === 'string' && event.name ? event.name : 'image preview'
}

const isImageMimeType = (mimeType: string | undefined): boolean => {
  return typeof mimeType === 'string' && mimeType.startsWith('image/')
}

const readBlobAsPreviewUrl = (blob: Blob): string => {
  if (typeof FileReaderSync === 'function') {
    const reader = new FileReaderSync()
    return reader.readAsDataURL(blob)
  }
  if (typeof URL.createObjectURL === 'function') {
    return URL.createObjectURL(blob)
  }
  throw new Error('image preview reader is not available')
}

const validateImage = async (blob: Blob): Promise<void> => {
  if (typeof createImageBitmap !== 'function') {
    return
  }
  const bitmap = await createImageBitmap(blob)
  bitmap.close?.()
}

export const getAttachmentImagePreview = async (event: ChatViewEvent): Promise<AttachmentImagePreview | string | undefined> => {
  if (event.type !== 'chat-attachment-added') {
    return undefined
  }
  const blob = getBlob(event)
  const mimeType = getMimeType(event)
  if (!blob || !isImageMimeType(mimeType)) {
    return undefined
  }
  try {
    await validateImage(blob)
    return {
      alt: getAltText(event),
      previewType: 'image',
      src: readBlobAsPreviewUrl(blob),
    }
  } catch {
    return ChatDebugStrings.imageCouldNotBeLoaded()
  }
}
