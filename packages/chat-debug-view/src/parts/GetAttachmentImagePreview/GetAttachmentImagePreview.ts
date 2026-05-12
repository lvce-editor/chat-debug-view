import type { AttachmentImagePreview } from '../AttachmentImagePreview/AttachmentImagePreview.ts'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { getAttachmentImagePreviewAltText } from '../GetAttachmentImagePreviewAltText/GetAttachmentImagePreviewAltText.ts'
import { getAttachmentImagePreviewBlob } from '../GetAttachmentImagePreviewBlob/GetAttachmentImagePreviewBlob.ts'
import { getAttachmentImagePreviewMimeType } from '../GetAttachmentImagePreviewMimeType/GetAttachmentImagePreviewMimeType.ts'
import { getImageStats } from '../GetImageStats/GetImageStats.ts'
import { isImageMimeType } from '../IsImageMimeType/IsImageMimeType.ts'
import { readBlobAsPreviewUrl } from '../ReadBlobAsPreviewUrl/ReadBlobAsPreviewUrl.ts'

export const getAttachmentImagePreview = async (event: ChatViewEvent): Promise<AttachmentImagePreview | string | undefined> => {
  if (event.type !== 'chat-attachment-added' && event.type !== 'chat-attachment-removed') {
    return undefined
  }
  const blob = getAttachmentImagePreviewBlob(event)
  const mimeType = getAttachmentImagePreviewMimeType(event)
  if (!blob || !isImageMimeType(mimeType)) {
    return undefined
  }
  try {
    const stats = await getImageStats(blob, mimeType)
    return {
      alt: getAttachmentImagePreviewAltText(event),
      previewType: 'image',
      src: readBlobAsPreviewUrl(blob),
      stats,
    }
  } catch {
    return ChatDebugStrings.imageCouldNotBeLoaded()
  }
}
