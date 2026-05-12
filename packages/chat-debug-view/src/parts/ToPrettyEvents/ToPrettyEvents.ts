import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'
import * as GetResponseMap from '../GetResponseMap/GetResponseMap.ts'

const getMergedRequestResponseEvent = (item: ChatViewEvent, response: ChatViewEvent): ChatViewEvent => {
  const parsedStart = new Date(item.timestamp || '')
  const parsedEnd = new Date(response.timestamp || '')
  const durationMs = parsedEnd.getTime() - parsedStart.getTime()

  if (Number.isFinite(durationMs) && durationMs >= 0) {
    return {
      durationMs,
      eventEndId: response.eventId,
      eventId: item.eventId,
      method: 'POST',
      type: 'ai-request-response',
    }
  }

  return {
    eventEndId: response.eventId,
    eventId: item.eventId,
    method: 'POST',
    type: 'ai-request-response',
  }
}

export const toPrettyEvents = (rawEvents: ListChatViewEventsResult): readonly ChatViewEvent[] => {
  if (rawEvents.type === 'error') {
    return []
  }
  const pretty: ChatViewEvent[] = []
  const map = GetResponseMap.getResponseMap(rawEvents.events)
  for (const item of rawEvents.events) {
    if (item.type === 'ai-request' && 'requestId' in item && typeof item.requestId === 'string') {
      const response = map[item.requestId]
      if (response) {
        pretty.push(getMergedRequestResponseEvent(item, response))
      } else {
        pretty.push(item)
      }
    } else if (item.type === 'ai-response' && 'requestId' in item && typeof item.requestId === 'string') {
      // ignore, we match it with request
    } else {
      pretty.push(item)
    }
  }
  return pretty
}
