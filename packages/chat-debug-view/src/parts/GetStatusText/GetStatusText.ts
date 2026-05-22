import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { hasErrorStatus } from '../HasErrorStatus/HasErrorStatus.ts'

export const getStatusText = (event: ChatViewEvent): string => {
  if (event.status) {
    return String(event.status)
  }
  return hasErrorStatus(event) ? '400' : '200'
}
