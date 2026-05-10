import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'
import * as ToPrettyEvents from '../ToPrettyEvents/ToPrettyEvents.ts'

export const listChatViewEvents = async (
  sessionId: string,
  _databaseName: string,
  _dataBaseVersion: number,
  _eventStoreName: string,
  _sessionIdIndexName: string,
): Promise<ListChatViewEventsResult> => {
  try {
    const rawEvents = await ChatStorageWorkerClient.listChatViewEvents(sessionId)
    if (rawEvents.type === 'error') {
      return rawEvents
    }
    const prettyEvents = ToPrettyEvents.toPrettyEvents(rawEvents)
    return {
      events: prettyEvents,
      type: 'success',
    }
  } catch (error) {
    return {
      error,
      type: 'error',
    }
  }
}