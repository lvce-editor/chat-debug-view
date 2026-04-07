import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'

export const listChatViewEvents = async (sessionId: string): Promise<ListChatViewEventsResult> => {
  return ChatStorageWorker.invoke('ChatStorage.listChatViewEvents', sessionId) as Promise<ListChatViewEventsResult>
}

export const loadSelectedEvent = async (sessionId: string, eventId: number, type: string): Promise<ChatViewEvent | null> => {
  return ChatStorageWorker.invoke('ChatStorage.loadSelectedEvent', sessionId, eventId, type) as Promise<ChatViewEvent | null>
}
