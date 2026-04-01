import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventDetailsBySessionIdAndEventId } from '../GetEventDetailsBySessionIdAndEventId/GetEventDetailsBySessionIdAndEventId.ts'
import { openDatabase } from '../OpenDatabase/OpenDatabase.ts'

export const loadSelectedEvent = async (
  databaseName: string,
  dataBaseVersion: number,
  eventStoreName: string,
  sessionId: string,
  sessionIdIndexName: string,
  eventId: number,
  type: string,
): Promise<ChatViewEvent | null> => {
  const database = await openDatabase(databaseName, dataBaseVersion)
  try {
    if (!database.objectStoreNames.contains(eventStoreName)) {
      return null
    }
    const transaction = database.transaction(eventStoreName, 'readonly')
    const store = transaction.objectStore(eventStoreName)
    const event = await getEventDetailsBySessionIdAndEventId(store, sessionId, sessionIdIndexName, eventId, type)
    return event ?? null
  } finally {
    database.close()
  }
}
