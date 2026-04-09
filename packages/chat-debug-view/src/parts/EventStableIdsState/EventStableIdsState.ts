import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const stableEventIdSymbol = Symbol('stableEventId')

export type ChatViewEventWithStableId = ChatViewEvent & {
  [stableEventIdSymbol]?: string
}

export const eventStableIdState = {
  nextStableEventId: 1,
}
