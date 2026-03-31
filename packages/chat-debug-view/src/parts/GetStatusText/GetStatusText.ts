import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { hasErrorStatus } from '../HasErrorStatus/HasErrorStatus.ts'

export const getStatusText = (event: ChatViewEvent): string => {
  return hasErrorStatus(event) ? '400' : '200'
}