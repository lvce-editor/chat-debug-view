import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'

export const listChatViewEventsDependencies = {
  listChatViewEventsFromWorker: ChatStorageWorkerClient.listChatViewEvents,
}

export const listChatViewEvents = async (
  sessionId: string,
  _databaseName: string,
  _dataBaseVersion: number,
  _eventStoreName: string,
  _sessionIdIndexName: string,
): Promise<ListChatViewEventsResult> => {
  try {
    return await listChatViewEventsDependencies.listChatViewEventsFromWorker(sessionId)
  } catch (error) {
    return {
      error,
      type: 'error',
    }
  }
}
