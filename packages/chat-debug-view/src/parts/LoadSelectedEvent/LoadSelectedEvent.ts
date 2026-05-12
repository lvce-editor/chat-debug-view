import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'

export interface LoadSelectedEventOptions {
  readonly endEventId?: number
  readonly eventId: number
  readonly sessionId: string
  readonly type: string
}

export const loadSelectedEvent = async ({ endEventId, eventId, sessionId, type }: LoadSelectedEventOptions): Promise<ChatViewEvent | null> => {
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
