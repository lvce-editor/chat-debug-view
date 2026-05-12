import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'
import * as CreateBlob from '../CreateBlob/CreateBlob.ts'

export const appendStoredRemovedImageAttachmentForTest = async (
  state: ChatDebugViewState,
  sessionId: string,
  eventId: number,
  mimeType: string,
  name: string,
  contentKind: string,
  content: string,
  timestamp: string,
): Promise<ChatDebugViewState> => {
  const blob = await CreateBlob.createBlob(mimeType, contentKind, content)
  await ChatStorageWorkerClient.appendEvent({
    attachmentId: `attachment-${eventId}`,
    blob,
    eventId,
    mimeType,
    name,
    sessionId,
    timestamp,
    type: 'chat-attachment-removed',
  })
  return state
}
