// cspell:ignore IDBP
import type { IDBPObjectStore } from 'idb'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

type EventStore = Pick<IDBPObjectStore, 'get' | 'getAll' | 'index' | 'indexNames'>

const startedEventType = 'tool-execution-started'
const finishedEventType = 'tool-execution-finished'

const getRawEventBySessionIdAndEventId = async (
  store: EventStore, // eslint-disable-line @typescript-eslint/prefer-readonly-parameter-types
  sessionId: string,
  sessionIdIndexName: string,
  eventId: number,
): Promise<ChatViewEvent | undefined> => {
  if (eventId < 1) {
    return undefined
  }
  if (store.indexNames.contains(sessionIdIndexName)) {
    const index = store.index(sessionIdIndexName)
    const keys = await index.getAllKeys(sessionId, eventId)
    if (keys.length < eventId) {
      return undefined
    }
    const key = keys[keys.length - 1]
    const event = await store.get(key)
    return event as ChatViewEvent | undefined
  }
  const all = (await store.getAll()) as readonly ChatViewEvent[]
  const events = all.filter((event) => event.sessionId === sessionId)
  return events[eventId - 1]
}

const hasMatchingToolName = (startedEvent: ChatViewEvent, finishedEvent: ChatViewEvent): boolean => {
  if (typeof startedEvent.toolName === 'string' && typeof finishedEvent.toolName === 'string') {
    return startedEvent.toolName === finishedEvent.toolName
  }
  return true
}

const mergeToolExecutionEvents = (startedEvent: ChatViewEvent, finishedEvent: ChatViewEvent, eventId: number): ChatViewEvent => {
  return {
    ...startedEvent,
    ...finishedEvent,
    ended: finishedEvent.ended ?? finishedEvent.endTime ?? finishedEvent.timestamp,
    eventId,
    started: startedEvent.started ?? startedEvent.startTime ?? startedEvent.timestamp,
    type: 'tool-execution',
  }
}

export const getEventDetailsBySessionIdAndEventId = async (
  store: EventStore, // eslint-disable-line @typescript-eslint/prefer-readonly-parameter-types
  sessionId: string,
  sessionIdIndexName: string,
  eventId: number,
  summaryType: string,
): Promise<ChatViewEvent | undefined> => {
  const event = await getRawEventBySessionIdAndEventId(store, sessionId, sessionIdIndexName, eventId)
  if (!event) {
    return undefined
  }
  if (summaryType !== 'tool-execution') {
    return {
      ...event,
      eventId,
    }
  }
  if (event.type !== startedEventType) {
    return {
      ...event,
      eventId,
    }
  }
  const nextEvent = await getRawEventBySessionIdAndEventId(store, sessionId, sessionIdIndexName, eventId + 1)
  if (!nextEvent || nextEvent.type !== finishedEventType || nextEvent.sessionId !== sessionId || !hasMatchingToolName(event, nextEvent)) {
    return {
      ...event,
      eventId,
    }
  }
  return mergeToolExecutionEvents(event, nextEvent, eventId)
}