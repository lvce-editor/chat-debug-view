import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const toolEventTypePrefix = 'tool-execution'

export const isToolEvent = (event: ChatViewEvent): boolean => {
  return event.type.startsWith(toolEventTypePrefix)
}
