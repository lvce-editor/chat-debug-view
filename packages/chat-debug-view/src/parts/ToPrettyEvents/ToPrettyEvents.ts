import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ListChatViewEventsResult } from '../ListChatViewEventsResult/ListChatViewEventsResult.ts'
import { getEndedTimestamp } from '../GetEndedTimestamp/GetEndedTimestamp.ts'
import * as GetResponseMap from '../GetResponseMap/GetResponseMap.ts'
import { getResponsePayloadSize } from '../GetResponsePayloadSize/GetResponsePayloadSize.ts'
import { getStartedTimestamp } from '../GetStartedTimestamp/GetStartedTimestamp.ts'

const getStatus = (item: ChatViewEvent): number | undefined => {
  if (item.statusCode !== undefined) {
    const statusCode = Number(item.statusCode)
    if (Number.isFinite(statusCode)) {
      return statusCode
    }
  }
  if (item.status !== undefined) {
    const status = Number(item.status)
    if (Number.isFinite(status)) {
      return status
    }
  }
  return undefined
}

const getMergedRequestResponseEvent = (item: ChatViewEvent, response: ChatViewEvent): ChatViewEvent => {
  const parsedStart = new Date(item.timestamp || '')
  const parsedEnd = new Date(response.timestamp || '')
  const durationMs = parsedEnd.getTime() - parsedStart.getTime()
  const started = getStartedTimestamp(item)
  const ended = getEndedTimestamp(response)
  const timestamp = item.timestamp ?? started
  const status = getStatus(item)

  if (Number.isFinite(durationMs) && durationMs >= 0) {
    return {
      durationMs,
      ...(ended === undefined ? {} : { ended }),
      eventEndId: response.eventId,
      eventId: item.eventId,
      method: 'POST',
      size: getResponsePayloadSize(response),
      ...(started === undefined ? {} : { started }),
      ...(status === undefined ? {} : { status }),
      ...(timestamp === undefined ? {} : { timestamp }),
      type: 'ai-request-response',
    }
  }

  return {
    ...(ended === undefined ? {} : { ended }),
    eventEndId: response.eventId,
    eventId: item.eventId,
    method: 'POST',
    size: getResponsePayloadSize(response),
    ...(started === undefined ? {} : { started }),
    ...(status === undefined ? {} : { status }),
    ...(timestamp === undefined ? {} : { timestamp }),
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
