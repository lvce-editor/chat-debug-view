/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { ChatViewEvent } from '../../ChatViewEvent/ChatViewEvent.ts'
import { getEventsBySessionId } from '../GetEventsBySessionId/GetEventsBySessionId.ts'
import { openDatabase } from '../OpenDatabase/OpenDatabase.ts'

export const listChatViewEvents = async (
  sessionId: string,
  databaseName: string,
  dataBaseVersion: number,
  eventStoreName: string,
  sessionIdIndexName: string,
): Promise<readonly ChatViewEvent[]> => {
  if (typeof indexedDB === 'undefined') {
    return []
  }
  const database = await openDatabase(databaseName, dataBaseVersion)
  try {
    if (!database.objectStoreNames.contains(eventStoreName)) {
      return []
    }
    const transaction = database.transaction(eventStoreName, 'readonly')
    const store = transaction.objectStore(eventStoreName)
    if (!sessionId) {
      return []
    }
    return getEventsBySessionId(store, sessionId, sessionIdIndexName)
  } finally {
    database.close()
  }
}