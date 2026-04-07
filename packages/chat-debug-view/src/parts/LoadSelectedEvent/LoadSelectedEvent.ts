import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'
import * as GetEventDetailsBySessionIdAndEventId from '../GetEventDetailsBySessionIdAndEventId/GetEventDetailsBySessionIdAndEventId.ts'
import * as OpenDatabase from '../OpenDatabase/OpenDatabase.ts'
import { storageBackendConfig } from '../StorageBackendConfig/StorageBackendConfig.ts'

export const loadSelectedEventDependencies = {
  getEventDetailsBySessionIdAndEventId: GetEventDetailsBySessionIdAndEventId.getEventDetailsBySessionIdAndEventId,
  loadSelectedEventFromWorker: ChatStorageWorkerClient.loadSelectedEvent,
  openDatabase: OpenDatabase.openDatabase,
}

export const loadSelectedEvent = async (
  databaseName: string,
  dataBaseVersion: number,
  eventStoreName: string,
  sessionId: string,
  sessionIdIndexName: string,
  eventId: number,
  type: string,
): Promise<ChatViewEvent | null> => {
  if (storageBackendConfig.useChatStorageWorker) {
    return loadSelectedEventDependencies.loadSelectedEventFromWorker(sessionId, eventId, type)
  }

  const database = await loadSelectedEventDependencies.openDatabase(databaseName, dataBaseVersion)
  try {
    if (!database.objectStoreNames.contains(eventStoreName)) {
      return null
    }
    const transaction = database.transaction(eventStoreName, 'readonly')
    const store = transaction.objectStore(eventStoreName)
    const event = await loadSelectedEventDependencies.getEventDetailsBySessionIdAndEventId(store, sessionId, sessionIdIndexName, eventId, type)
    return event ?? null
  } finally {
    database.close()
  }
}
