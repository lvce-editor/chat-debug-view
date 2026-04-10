import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { handleSubmitEventType, sseResponseCompletedEventType } from '../EventTypes/EventTypes.ts'
import { isMatchingToolExecutionPair } from '../IsMatchingToolExecutionPair/IsMatchingToolExecutionPair.ts'
import { isToolExecutionFinishedEvent } from '../IsToolExecutionFinishedEvent/IsToolExecutionFinishedEvent.ts'
import { isToolExecutionStartedEvent } from '../IsToolExecutionStartedEvent/IsToolExecutionStartedEvent.ts'
import { mergeToolExecutionEvents } from '../MergeToolExecutionEvents/MergeToolExecutionEvents.ts'

const isMatchingHandleSubmitPair = (startedEvent: ChatViewEvent, finishedEvent: ChatViewEvent): boolean => {
  return (
    startedEvent.type === handleSubmitEventType &&
    finishedEvent.type === sseResponseCompletedEventType &&
    startedEvent.sessionId === finishedEvent.sessionId
  )
}

export const collapseToolExecutionEvents = (events: readonly ChatViewEvent[]): readonly ChatViewEvent[] => {
  const collapsedEvents: ChatViewEvent[] = []
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    const nextEvent = events[i + 1]
    if (nextEvent && isToolExecutionStartedEvent(event) && isToolExecutionFinishedEvent(nextEvent) && isMatchingToolExecutionPair(event, nextEvent)) {
      collapsedEvents.push(mergeToolExecutionEvents(event, nextEvent))
      i++
      continue
    }
    if (nextEvent && isMatchingHandleSubmitPair(event, nextEvent)) {
      collapsedEvents.push(mergeToolExecutionEvents(event, nextEvent, handleSubmitEventType))
      i++
      continue
    }
    collapsedEvents.push(event)
  }
  return collapsedEvents
}
