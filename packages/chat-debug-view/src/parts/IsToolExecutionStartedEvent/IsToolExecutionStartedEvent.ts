import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { startedEventType } from '../EventTypes/EventTypes.ts'

export const isToolExecutionStartedEvent = (event: ChatViewEvent): boolean => {
  return event.type === startedEventType
}
