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
<<<<<<< HEAD
        const parsedStart = new Date(item.timestamp || '')
        const parsedEnd = new Date(response.timestamp || '')
        const durationMs = parsedEnd.getTime() - parsedStart.getTime()
        const mergedEvent: ChatViewEvent = Number.isFinite(durationMs)
          ? {
              eventId: item.eventId,
              method: 'POST',
              time: `${durationMs}ms`,
              type: 'ai-request-response',
            }
          : {
              eventId: item.eventId,
              method: 'POST',
              type: 'ai-request-response',
            }
        pretty.push(mergedEvent)
=======
        pretty.push({
          eventEndId: response.eventId,
          eventId: item.eventId,
          type: 'ai-request-response',
        })
>>>>>>> 40480644f9d8 (fix: Add eventEndId to ai-request-response objects in toPrettyEvents function (#261))
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
