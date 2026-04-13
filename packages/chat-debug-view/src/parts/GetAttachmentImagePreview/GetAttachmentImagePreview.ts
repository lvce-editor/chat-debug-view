import type { AttachmentImagePreview } from '../AttachmentImagePreview/AttachmentImagePreview.ts'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'

const svgWidthRegex = /\bwidth=["']([\d.]+)(?:px)?["']/i
const svgHeightRegex = /\bheight=["']([\d.]+)(?:px)?["']/i
const svgViewBoxRegex = /\bviewBox=["'][^"']*?([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)["']/i

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

const formatImageSize = (size: number): string => {
  if (size < 1024) {
    return `${size} B`
  }
  return `${(size / 1024).toFixed(1)} kB`
}

const formatImageStats = (width: number, height: number, size: number): string => {
  return `${width} × ${height} px · ${formatImageSize(size)}`
}

const getSvgImageStats = async (blob: Blob): Promise<string | undefined> => {
  const text = await blob.text()
  const widthMatch = text.match(svgWidthRegex)
  const heightMatch = text.match(svgHeightRegex)
  if (widthMatch && heightMatch) {
    return formatImageStats(Number(widthMatch[1]), Number(heightMatch[1]), blob.size)
  }
  const viewBoxMatch = text.match(svgViewBoxRegex)
  if (viewBoxMatch) {
    return formatImageStats(Number(viewBoxMatch[3]), Number(viewBoxMatch[4]), blob.size)
  }
  return undefined
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

const getRasterImageStats = async (blob: Blob): Promise<string> => {
  if (typeof createImageBitmap !== 'function') {
    throw new TypeError('image bitmap decoder is not available')
  }
  const bitmap = await createImageBitmap(blob)
  try {
    return formatImageStats(bitmap.width, bitmap.height, blob.size)
  } finally {
    bitmap.close?.()
  }
}

const getImageStats = async (blob: Blob, mimeType: string | undefined): Promise<string> => {
  if (mimeType === 'image/svg+xml') {
    const svgStats = await getSvgImageStats(blob)
    if (svgStats === undefined) {
      throw new TypeError('image stats are not available')
    }
    return svgStats
  }
  return getRasterImageStats(blob)
}

export const getAttachmentImagePreview = async (event: ChatViewEvent): Promise<AttachmentImagePreview | string | undefined> => {
  if (event.type !== 'chat-attachment-added' && event.type !== 'chat-attachment-removed') {
    return undefined
  }
  const blob = getBlob(event)
  const mimeType = getMimeType(event)
  if (!blob || !isImageMimeType(mimeType)) {
    return undefined
  }
  try {
    const stats = await getImageStats(blob, mimeType)
    return {
      alt: getAltText(event),
      previewType: 'image',
      src: readBlobAsPreviewUrl(blob),
      stats,
    }
  } catch {
    return ChatDebugStrings.imageCouldNotBeLoaded()
  }
}
