import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const toolEventTypePrefixes = ['tool-execution', 'tool-request']

export const isToolEvent = (event: ChatViewEvent): boolean => {
  return toolEventTypePrefixes.some((prefix) => event.type.startsWith(prefix))
}
