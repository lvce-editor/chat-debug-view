import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'

export const loadSelectedEvent = async (
  _databaseName: string,
  _dataBaseVersion: number,
  _eventStoreName: string,
  sessionId: string,
  _sessionIdIndexName: string,
  eventId: number,
  type: string,
  endEventId?: number,
): Promise<ChatViewEvent | null> => {
  const raw = await ChatStorageWorkerClient.loadSelectedEvent(sessionId, eventId, type)
  if (endEventId && endEventId !== -1) {
    const end = await ChatStorageWorkerClient.loadSelectedEvent(sessionId, endEventId, type)
    // @ts-ignore
    return {
      ...raw,
      endValue: end,
    }
  }
  return raw
}
