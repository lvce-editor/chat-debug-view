import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'
import { toTimeNumber } from '../ToTimeNumber/ToTimeNumber.ts'

const getEventTime = (event: ChatViewEvent): number => {
  return toTimeNumber(event.started ?? event.startTime ?? event.startTimestamp ?? event.timestamp) ?? Number.MAX_SAFE_INTEGER
}

const isUserMessageEvent = (event: ChatViewEvent): boolean => {
  if (event.type !== 'message') {
    return false
  }
  const { message } = event
  if (!message || typeof message !== 'object') {
    return false
  }
  const { role } = message as { readonly role?: unknown }
  return role === 'user'
}

export const getCombinedEvents = async (sessionId: string): Promise<readonly ChatViewEvent[]> => {
  const [events, debugEvents] = await Promise.all([ChatStorageWorkerClient.getEvents(sessionId), ChatStorageWorkerClient.getDebugEvents(sessionId)])
  return [...events, ...debugEvents]
    .filter((event) => !isUserMessageEvent(event))
    .toSorted((first, second) => getEventTime(first) - getEventTime(second))
    .map((event, index) => ({
      ...event,
      eventId: index + 1,
    }))
}
