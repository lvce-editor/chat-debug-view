import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'

export const appendEvent = async (event: ChatViewEvent): Promise<void> => {
  return ChatStorageWorker.invoke('ChatStorage.appendEvent', event) as Promise<void>
}

export const listChatViewEvents = async (sessionId: string): Promise<ListChatViewEventsResult> => {
  return ChatStorageWorker.invoke('ChatStorage.listChatViewEvents', sessionId) as Promise<ListChatViewEventsResult>
}

export const getEvents = async (sessionId: string): Promise<readonly ChatViewEvent[]> => {
  return ChatStorageWorker.invoke('ChatStorage.getEvents', sessionId) as Promise<readonly ChatViewEvent[]>
}

export const getDebugEvents = async (sessionId: string): Promise<readonly ChatViewEvent[]> => {
  try {
    return (await ChatStorageWorker.invoke('ChatStorage.getDebugEvents', sessionId)) as Promise<readonly ChatViewEvent[]>
  } catch {
    // ignore
    return []
  }
}

export const loadSelectedEvent = async (sessionId: string, eventId: number, type: string): Promise<ChatViewEvent | null> => {
  return ChatStorageWorker.invoke('ChatStorage.loadSelectedEvent', sessionId, eventId, type) as Promise<ChatViewEvent | null>
}

export const registerUpdateListener = async (sessionId: string, rpcId: string, uid: number): Promise<void> => {
  return ChatStorageWorker.invoke('ChatStorage.registerUpdateListener', sessionId, rpcId, uid) as Promise<void>
}
