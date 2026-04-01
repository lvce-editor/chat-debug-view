import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getOrCreateStableEventId } from '../GetOrCreateStableEventId/GetOrCreateStableEventId.ts'

export const getStableEventId = (event: ChatViewEvent): string => {
  return getOrCreateStableEventId(event)
}
