import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'
import { toTimeNumber } from '../ToTimeNumber/ToTimeNumber.ts'

export const listChatViewEvents = async (
  sessionId: string,
  _databaseName: string,
  _dataBaseVersion: number,
  _eventStoreName: string,
  _sessionIdIndexName: string,
): Promise<ListChatViewEventsResult> => {
  try {
    const [events, debugEvents] = await Promise.all([ChatStorageWorkerClient.getEvents(sessionId), ChatStorageWorkerClient.getDebugEvents(sessionId)])
    const combinedEvents = [...events, ...debugEvents]
      .sort((first, second) => {
        const firstTime = toTimeNumber(first.started ?? first.startTime ?? first.startTimestamp ?? first.timestamp) ?? Number.MAX_SAFE_INTEGER
        const secondTime = toTimeNumber(second.started ?? second.startTime ?? second.startTimestamp ?? second.timestamp) ?? Number.MAX_SAFE_INTEGER
        return firstTime - secondTime
      })
      .map((event, index) => ({
        ...event,
        eventId: index + 1,
      }))
    return {
      events: combinedEvents,
      type: 'success',
    }
  } catch (error) {
    return {
      error,
      type: 'error',
    }
  }
}
