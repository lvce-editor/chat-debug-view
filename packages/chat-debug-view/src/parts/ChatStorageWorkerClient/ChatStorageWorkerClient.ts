import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'
import * as WorkerRpc from '../WorkerRpc/WorkerRpc.ts'

export const chatStorageWorkerClientDependencies = {
  invoke: WorkerRpc.invoke,
}

export const listChatViewEvents = async (sessionId: string): Promise<ListChatViewEventsResult> => {
  return chatStorageWorkerClientDependencies.invoke('ChatStorage.listChatViewEvents', sessionId) as Promise<ListChatViewEventsResult>
}

export const loadSelectedEvent = async (sessionId: string, eventId: number, type: string): Promise<ChatViewEvent | null> => {
  return chatStorageWorkerClientDependencies.invoke('ChatStorage.loadSelectedEvent', sessionId, eventId, type) as Promise<ChatViewEvent | null>
}
