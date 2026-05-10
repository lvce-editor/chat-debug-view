import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'
import * as GetResponseMap from '../GetResponseMap/GetResponseMap.ts'

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
        const parsedStart = new Date(item.timestamp || '')
        const parsedEnd = new Date(response.timestamp || '')
        const durationMs = parsedEnd.getTime() - parsedStart.getTime()
        const formattedDuration = `${durationMs}ms`
        pretty.push({
          eventId: item.eventId,
          method: 'POST',
          time: formattedDuration,
          type: 'ai-request-response',
        })
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
