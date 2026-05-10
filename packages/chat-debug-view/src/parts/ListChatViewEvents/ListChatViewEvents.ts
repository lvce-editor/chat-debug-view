import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'
<<<<<<< HEAD
import { collapseAiRequestResponseEvents } from '../CollapseToolExecutionEvents/CollapseToolExecutionEvents.ts'
=======
import * as ToPrettyEvents from '../ToPrettyEvents/ToPrettyEvents.ts'
>>>>>>> origin/main

export const listChatViewEvents = async (
  sessionId: string,
  _databaseName: string,
  _dataBaseVersion: number,
  _eventStoreName: string,
  _sessionIdIndexName: string,
): Promise<ListChatViewEventsResult> => {
  try {
<<<<<<< HEAD
    const result = await ChatStorageWorkerClient.listChatViewEvents(sessionId)
    if (result.type !== 'success') {
      return result
    }
    return {
      ...result,
      events: collapseAiRequestResponseEvents(result.events),
=======
    const rawEvents = await ChatStorageWorkerClient.listChatViewEvents(sessionId)
    if (rawEvents.type === 'error') {
      return rawEvents
    }
    const prettyEvents = ToPrettyEvents.toPrettyEvents(rawEvents)
    return {
      events: prettyEvents,
      type: 'success',
>>>>>>> origin/main
    }
  } catch (error) {
    return {
      error,
      type: 'error',
    }
  }
}
