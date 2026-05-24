import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

<<<<<<< HEAD
const toolEventTypePrefixes = ['tool-execution', 'tool-request']

export const isToolEvent = (event: ChatViewEvent): boolean => {
  return toolEventTypePrefixes.some((prefix) => event.type.startsWith(prefix))
=======
const toolEventTypePrefix = 'tool-execution'
const toolRequestResponseEventType = 'tool-request-response'

export const isToolEvent = (event: ChatViewEvent): boolean => {
  return event.type.startsWith(toolEventTypePrefix) || event.type === toolRequestResponseEventType
>>>>>>> origin/main
}
