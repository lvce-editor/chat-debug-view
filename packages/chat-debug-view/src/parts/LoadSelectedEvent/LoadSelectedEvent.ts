import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'
import { collapseToolExecutionEvents } from '../CollapseToolExecutionEvents/CollapseToolExecutionEvents.ts'
import { toTimeNumber } from '../ToTimeNumber/ToTimeNumber.ts'

const getEventTime = (event: ChatViewEvent): number => {
  return toTimeNumber(event.started ?? event.startTime ?? event.startTimestamp ?? event.timestamp) ?? Number.MAX_SAFE_INTEGER
}

const getCombinedEvents = async (sessionId: string): Promise<readonly ChatViewEvent[]> => {
  const [events, debugEvents] = await Promise.all([ChatStorageWorkerClient.getEvents(sessionId), ChatStorageWorkerClient.getDebugEvents(sessionId)])
  return [...events, ...debugEvents]
    .sort((first, second) => getEventTime(first) - getEventTime(second))
    .map((event, index) => ({
      ...event,
      eventId: index + 1,
    }))
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
  const events = await getCombinedEvents(sessionId)
  const collapsedEvents = collapseToolExecutionEvents(events)
  const event = collapsedEvents.find((candidate) => candidate.eventId === eventId && candidate.type === type)
  return event || null
}
