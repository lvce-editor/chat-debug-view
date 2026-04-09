import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { eventStableIdState, stableEventIdSymbol, type ChatViewEventWithStableId } from '../EventStableIdsState/EventStableIdsState.ts'

export const getOrCreateStableEventId = (event: ChatViewEvent): string => {
  const eventWithStableId = event as ChatViewEventWithStableId
  const existingStableEventId = eventWithStableId[stableEventIdSymbol]
  if (existingStableEventId) {
    return existingStableEventId
  }
  const stableEventId = `event-${eventStableIdState.nextStableEventId++}`
  Object.defineProperty(eventWithStableId, stableEventIdSymbol, {
    configurable: true,
    enumerable: false,
    value: stableEventId,
    writable: true,
  })
  return stableEventId
}
