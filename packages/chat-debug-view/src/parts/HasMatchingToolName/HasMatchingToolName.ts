import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const hasMatchingToolName = (startedEvent: ChatViewEvent, finishedEvent: ChatViewEvent): boolean => {
  if (typeof startedEvent.toolName === 'string' && typeof finishedEvent.toolName === 'string') {
    return startedEvent.toolName === finishedEvent.toolName
  }
  return true
}
