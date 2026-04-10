import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const hasOwn = (event: ChatViewEvent, key: string): boolean => {
  return Object.hasOwn(event, key)
}
