import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'

const getResponseMap = (events: readonly ChatViewEvent[]): Record<string, ChatViewEvent> => {
  const seen: Record<string, ChatViewEvent> = Object.create(null)
  for (const event of events) {
    if (event.type === 'ai-response' && 'requestId' in event && typeof event.requestId === 'string') {
      seen[event.requestId] = event
    }
  }
  return seen
}

const toPrettyEvents = (rawEvents: ListChatViewEventsResult): readonly ChatViewEvent[] => {
  if (rawEvents.type === 'error') {
    return []
  }
  const pretty: ChatViewEvent[] = []
  const map = getResponseMap(rawEvents.events)
  for (const item of rawEvents.events) {
    if (item.type === 'ai-request' && 'requestId' in item && typeof item.requestId === 'string') {
      const response = map[item.requestId]
      if (response) {
        pretty.push({
          eventId: item.eventId,
          type: 'ai-request-response',
        })
      } else {
        pretty.push(item)
      }
    } else if (item.type === 'ai-response' && 'requestId' in item && typeof item.requestId === 'string') {
      // ignore, we match it with request
    }
    else {
      pretty.push(item)
    }

  }
  return pretty

}

export const listChatViewEvents = async (
  sessionId: string,
  _databaseName: string,
  _dataBaseVersion: number,
  _eventStoreName: string,
  _sessionIdIndexName: string,
): Promise<ListChatViewEventsResult> => {
  try {
    const rawEvents = await ChatStorageWorkerClient.listChatViewEvents(sessionId)
    if (rawEvents.type === 'error') {
      return rawEvents
    }
    const prettyEvents = toPrettyEvents(rawEvents)
    return {
      events: prettyEvents,
      type: 'success'
    }
  } catch (error) {
    return {
      error,
      type: 'error',
    }
  }
}