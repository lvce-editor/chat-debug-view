import type { ChatViewEvent } from '../../ChatViewEvent/ChatViewEvent.ts'
import { eventStableIds } from '../EventStableIdsState/EventStableIdsState.ts'

export const setStableEventId = (event: ChatViewEvent, stableEventId: string): void => {
  eventStableIds.set(event, stableEventId)
}
