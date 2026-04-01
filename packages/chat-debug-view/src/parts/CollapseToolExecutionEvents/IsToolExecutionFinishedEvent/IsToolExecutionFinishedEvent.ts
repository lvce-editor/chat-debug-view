import type { ChatViewEvent } from '../../ChatViewEvent/ChatViewEvent.ts'
import { finishedEventType } from '../EventTypes/EventTypes.ts'

export const isToolExecutionFinishedEvent = (event: ChatViewEvent): boolean => {
  return event.type === finishedEventType
}
