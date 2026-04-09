import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'

export const loadSelectedEventDependencies = {
  loadSelectedEventFromWorker: ChatStorageWorkerClient.loadSelectedEvent,
}

export const loadSelectedEvent = async (
  _databaseName: string,
  _dataBaseVersion: number,
  _eventStoreName: string,
  sessionId: string,
  _sessionIdIndexName: string,
  eventId: number,
  type: string,
): Promise<ChatViewEvent | null> => {
  return loadSelectedEventDependencies.loadSelectedEventFromWorker(sessionId, eventId, type)
}
