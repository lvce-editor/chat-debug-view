import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { hasOwn } from '../HasOwn/HasOwn.ts'

export const shouldIncludeArguments = (event: ChatViewEvent, name: string | undefined): boolean => {
  if (!hasOwn(event, 'arguments')) {
    return false
  }
  if (name === 'getWorkspaceUri') {
    return false
  }
  return true
}
