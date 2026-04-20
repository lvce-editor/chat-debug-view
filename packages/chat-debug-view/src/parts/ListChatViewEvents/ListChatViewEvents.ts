import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'
import { getCombinedEvents } from '../GetCombinedEvents/GetCombinedEvents.ts'

export const listChatViewEvents = async (
  sessionId: string,
  _databaseName: string,
  _dataBaseVersion: number,
  _eventStoreName: string,
  _sessionIdIndexName: string,
): Promise<ListChatViewEventsResult> => {
  try {
    const combinedEvents = await getCombinedEvents(sessionId)
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
