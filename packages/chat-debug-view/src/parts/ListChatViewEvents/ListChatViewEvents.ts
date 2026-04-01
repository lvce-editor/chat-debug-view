import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'
import { getEventsBySessionId } from '../GetEventsBySessionId/GetEventsBySessionId.ts'
import { isIndexedDbSupported } from '../IsIndexedDbSupported/IsIndexedDbSupported.ts'
import { openDatabase } from '../OpenDatabase/OpenDatabase.ts'

export const listChatViewEvents = async (
  sessionId: string,
  databaseName: string,
  dataBaseVersion: number,
  eventStoreName: string,
  sessionIdIndexName: string,
  indexedDbSupportOverride?: boolean, // Adjusted to ensure correct handling
): Promise<ListChatViewEventsResult> => {
  if (!isIndexedDbSupported(indexedDbSupportOverride)) {
    return {
      type: 'not-supported',
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
