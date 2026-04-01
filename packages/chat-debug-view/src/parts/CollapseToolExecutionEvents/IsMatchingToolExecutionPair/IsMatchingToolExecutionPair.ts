import type { ChatViewEvent } from '../../ChatViewEvent/ChatViewEvent.ts'
import { hasMatchingToolName } from '../HasMatchingToolName/HasMatchingToolName.ts'

export const isMatchingToolExecutionPair = (startedEvent: ChatViewEvent, finishedEvent: ChatViewEvent): boolean => {
  return startedEvent.sessionId === finishedEvent.sessionId && hasMatchingToolName(startedEvent, finishedEvent)
}
