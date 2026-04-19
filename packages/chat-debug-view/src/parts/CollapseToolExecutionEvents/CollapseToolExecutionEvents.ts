import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { handleSubmitEventType, sseResponseCompletedEventType } from '../EventTypes/EventTypes.ts'
import { isMatchingToolExecutionPair } from '../IsMatchingToolExecutionPair/IsMatchingToolExecutionPair.ts'
import { isToolExecutionFinishedEvent } from '../IsToolExecutionFinishedEvent/IsToolExecutionFinishedEvent.ts'
import { isToolExecutionStartedEvent } from '../IsToolExecutionStartedEvent/IsToolExecutionStartedEvent.ts'
import { mergeToolExecutionEvents } from '../MergeToolExecutionEvents/MergeToolExecutionEvents.ts'

const requestEventTypes = new Set(['request', 'ai-request'])
const responseEventTypes = new Set(['response', 'ai-response-success'])

const getPairId = (event: ChatViewEvent): string | number | undefined => {
  const { requestId, request_id: requestIdSnake, requestID, turnId, turn_id: turnIdSnake } = event as {
    readonly requestID?: unknown
    readonly requestId?: unknown
    readonly request_id?: unknown
    readonly turnId?: unknown
    readonly turn_id?: unknown
  }
  if (typeof requestId === 'string' || typeof requestId === 'number') {
    return requestId
  }
  if (typeof requestIdSnake === 'string' || typeof requestIdSnake === 'number') {
    return requestIdSnake
  }
  if (typeof requestID === 'string' || typeof requestID === 'number') {
    return requestID
  }
  if (typeof turnId === 'string' || typeof turnId === 'number') {
    return turnId
  }
  if (typeof turnIdSnake === 'string' || typeof turnIdSnake === 'number') {
    return turnIdSnake
  }
  const { body, request, response, value } = event as {
    readonly body?: Record<string, unknown>
    readonly request?: Record<string, unknown>
    readonly response?: Record<string, unknown>
    readonly value?: Record<string, unknown>
  }
  const bodyPairId = body?.requestId ?? body?.request_id ?? body?.requestID ?? body?.turnId ?? body?.turn_id
  if (typeof bodyPairId === 'string' || typeof bodyPairId === 'number') {
    return bodyPairId
  }
  const requestPairId = request?.requestId ?? request?.request_id ?? request?.requestID ?? request?.turnId ?? request?.turn_id
  if (typeof requestPairId === 'string' || typeof requestPairId === 'number') {
    return requestPairId
  }
  const valuePairId = value?.requestId ?? value?.request_id ?? value?.requestID ?? value?.turnId ?? value?.turn_id
  if (typeof valuePairId === 'string' || typeof valuePairId === 'number') {
    return valuePairId
  }
  const responsePairId = response?.requestId ?? response?.request_id ?? response?.requestID ?? response?.turnId ?? response?.turn_id
  if (typeof responsePairId === 'string' || typeof responsePairId === 'number') {
    return responsePairId
  }
  return undefined
}

const mergeRequestResponseEvents = (startedEvent: ChatViewEvent, finishedEvent: ChatViewEvent): ChatViewEvent => {
  return {
    ...mergeToolExecutionEvents(startedEvent, finishedEvent, startedEvent.type),
    requestEvent: startedEvent,
    responseEvent: finishedEvent,
  }
}

const isMatchingRequestResponsePair = (startedEvent: ChatViewEvent, finishedEvent: ChatViewEvent): boolean => {
  if (!requestEventTypes.has(startedEvent.type) || !responseEventTypes.has(finishedEvent.type)) {
    return false
  }
  if (startedEvent.sessionId !== finishedEvent.sessionId) {
    return false
  }
  const startedPairId = getPairId(startedEvent)
  const finishedPairId = getPairId(finishedEvent)
  if (startedPairId !== undefined && finishedPairId !== undefined) {
    return startedPairId === finishedPairId
  }
  return startedEvent.type === 'ai-request' && finishedEvent.type === 'ai-response-success'
}

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
    if (nextEvent && isMatchingRequestResponsePair(event, nextEvent)) {
      collapsedEvents.push(mergeRequestResponseEvents(event, nextEvent))
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
