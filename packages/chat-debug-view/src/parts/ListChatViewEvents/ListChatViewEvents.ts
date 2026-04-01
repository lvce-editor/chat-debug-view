import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'
import { getEventsBySessionId } from '../GetEventsBySessionId/GetEventsBySessionId.ts'
import { openDatabase } from '../OpenDatabase/OpenDatabase.ts'

export const listChatViewEvents = async (
  sessionId: string,
  databaseName: string,
  dataBaseVersion: number,
  eventStoreName: string,
  sessionIdIndexName: string,
): Promise<ListChatViewEventsResult> => {
  if (typeof indexedDB === 'undefined') {
    return {
      events: [],
      type: 'success',
    }
  }

  try {
    const database = await openDatabase(databaseName, dataBaseVersion)
    try {
      if (!database.objectStoreNames.contains(eventStoreName)) {
        return {
          events: [],
          type: 'success',
        }
      }
      const transaction = database.transaction(eventStoreName, 'readonly')
      const store = transaction.objectStore(eventStoreName)
      if (!sessionId) {
        return {
          events: [],
          type: 'success',
        }
      }
      const events = await getEventsBySessionId(store, sessionId, sessionIdIndexName)
      return {
        events,
        type: 'success',
      }
    } finally {
      database.close()
    }
  } catch (error) {
    return {
      error,
      type: 'error',
    }
  }
}
