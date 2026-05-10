import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'
import { collapseAiRequestResponseEvents } from '../CollapseToolExecutionEvents/CollapseToolExecutionEvents.ts'

export const listChatViewEvents = async (
  sessionId: string,
  _databaseName: string,
  _dataBaseVersion: number,
  _eventStoreName: string,
  _sessionIdIndexName: string,
): Promise<ListChatViewEventsResult> => {
  try {
    const result = await ChatStorageWorkerClient.listChatViewEvents(sessionId)
    if (result.type !== 'success') {
      return result
    }
    return {
      ...result,
      events: collapseAiRequestResponseEvents(result.events),
    }
  } catch (error) {
    return {
      error,
      type: 'error',
    }
  }
}
