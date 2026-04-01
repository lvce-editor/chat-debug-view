import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const startedEventType = 'tool-execution-started'
const finishedEventType = 'tool-execution-finished'
const mergedEventType = 'tool-execution'

const eventStableIds = new WeakMap<ChatViewEvent, string>()
let nextStableEventId = 1

const getOrCreateStableEventId = (event: ChatViewEvent): string => {
  const existingStableEventId = eventStableIds.get(event)
  if (existingStableEventId) {
    return existingStableEventId
  }
  const stableEventId = `event-${nextStableEventId++}`
  eventStableIds.set(event, stableEventId)
  return stableEventId
}

const setStableEventId = (event: ChatViewEvent, stableEventId: string): void => {
  eventStableIds.set(event, stableEventId)
}

const getTimestamp = (value: unknown): string | number | undefined => {
  return typeof value === 'string' || typeof value === 'number' ? value : undefined
}

const getStartedTimestamp = (event: ChatViewEvent): string | number | undefined => {
  return getTimestamp(event.started) ?? getTimestamp(event.startTime) ?? getTimestamp(event.startTimestamp) ?? getTimestamp(event.timestamp)
}

const getEndedTimestamp = (event: ChatViewEvent): string | number | undefined => {
  return getTimestamp(event.ended) ?? getTimestamp(event.endTime) ?? getTimestamp(event.endTimestamp) ?? getTimestamp(event.timestamp)
}

const isToolExecutionStartedEvent = (event: ChatViewEvent): boolean => {
  return event.type === startedEventType
}

const isToolExecutionFinishedEvent = (event: ChatViewEvent): boolean => {
  return event.type === finishedEventType
}

const hasMatchingToolName = (startedEvent: ChatViewEvent, finishedEvent: ChatViewEvent): boolean => {
  if (typeof startedEvent.toolName === 'string' && typeof finishedEvent.toolName === 'string') {
    return startedEvent.toolName === finishedEvent.toolName
  }
  return true
}

const isMatchingToolExecutionPair = (startedEvent: ChatViewEvent, finishedEvent: ChatViewEvent): boolean => {
  return startedEvent.sessionId === finishedEvent.sessionId && hasMatchingToolName(startedEvent, finishedEvent)
}

const mergeToolExecutionEvents = (startedEvent: ChatViewEvent, finishedEvent: ChatViewEvent): ChatViewEvent => {
  const ended = getEndedTimestamp(finishedEvent)
  const started = getStartedTimestamp(startedEvent)
  const mergedEvent: ChatViewEvent = {
    ...startedEvent,
    ...finishedEvent,
    ...(ended === undefined ? {} : { ended }),
    eventId: startedEvent.eventId,
    ...(started === undefined ? {} : { started }),
    type: mergedEventType,
  }
  const stableEventId = `${getOrCreateStableEventId(startedEvent)}:${getOrCreateStableEventId(finishedEvent)}`
  setStableEventId(mergedEvent, stableEventId)
  return mergedEvent
}

export const getStableEventId = (event: ChatViewEvent): string => {
  return getOrCreateStableEventId(event)
}

export const collapseToolExecutionEvents = (events: readonly ChatViewEvent[]): readonly ChatViewEvent[] => {
  const collapsedEvents: ChatViewEvent[] = []
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    if (isToolExecutionStartedEvent(event)) {
      const nextEvent = events[i + 1]
      if (nextEvent && isToolExecutionFinishedEvent(nextEvent) && isMatchingToolExecutionPair(event, nextEvent)) {
        collapsedEvents.push(mergeToolExecutionEvents(event, nextEvent))
        i++
        continue
      }
    }
    collapsedEvents.push(event)
  }
  return collapsedEvents
}
