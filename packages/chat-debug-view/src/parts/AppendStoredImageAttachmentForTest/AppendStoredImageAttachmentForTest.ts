import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'

const decodeBase64 = (value: string): Uint8Array => {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0))
}

const createCanvasBlob = async (mimeType: string): Promise<Blob> => {
  const canvas = new OffscreenCanvas(2, 2)
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('2d canvas context is not available')
  }
  context.fillStyle = '#0b6'
  context.fillRect(0, 0, 2, 2)
  return canvas.convertToBlob({
    type: mimeType,
  })
}

const createBlob = async (mimeType: string, contentKind: string, content: string): Promise<Blob> => {
  if (contentKind === 'canvas') {
    return createCanvasBlob(mimeType)
  }
  if (contentKind === 'base64') {
    return new Blob([decodeBase64(content)], {
      type: mimeType,
    })
  }
  return new Blob([content], {
    type: mimeType,
  })
}

export const appendStoredImageAttachmentForTest = async (
  state: ChatDebugViewState,
  sessionId: string,
  eventId: number,
  mimeType: string,
  name: string,
  contentKind: string,
  content: string,
  timestamp: string,
): Promise<ChatDebugViewState> => {
  const blob = await createBlob(mimeType, contentKind, content)
  await ChatStorageWorkerClient.appendEvent({
    attachmentId: `attachment-${eventId}`,
    blob,
    eventId,
    mimeType,
    name,
    sessionId,
    timestamp,
    type: 'chat-attachment-added',
  })
  return state
}
