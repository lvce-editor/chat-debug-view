import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { eventStableIdState, eventStableIds } from '../EventStableIdsState/EventStableIdsState.ts'

export const getOrCreateStableEventId = (event: ChatViewEvent): string => {
  const existingStableEventId = eventStableIds.get(event)
  if (existingStableEventId) {
    return existingStableEventId
  }
  const stableEventId = `event-${eventStableIdState.nextStableEventId++}`
  eventStableIds.set(event, stableEventId)
  return stableEventId
}
