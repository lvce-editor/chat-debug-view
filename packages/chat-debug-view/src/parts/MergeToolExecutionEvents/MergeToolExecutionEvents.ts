import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { mergedEventType } from '../EventTypes/EventTypes.ts'
import { getEndedTimestamp } from '../GetEndedTimestamp/GetEndedTimestamp.ts'
import { getStartedTimestamp } from '../GetStartedTimestamp/GetStartedTimestamp.ts'

export const mergeToolExecutionEvents = (
  startedEvent: ChatViewEvent,
  finishedEvent: ChatViewEvent,
  type: string = mergedEventType,
): ChatViewEvent => {
  const ended = getEndedTimestamp(finishedEvent)
  const { eventId } = startedEvent
  const started = getStartedTimestamp(startedEvent)
  const mergedEvent: ChatViewEvent = {
    ...startedEvent,
    ...finishedEvent,
    ...(ended === undefined ? {} : { ended }),
    ...(eventId === undefined ? {} : { eventId }),
    ...(started === undefined ? {} : { started }),
    type,
  }
  return mergedEvent
}
