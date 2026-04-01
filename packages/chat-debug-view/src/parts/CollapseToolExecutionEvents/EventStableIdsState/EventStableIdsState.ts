import type { ChatViewEvent } from '../../ChatViewEvent/ChatViewEvent.ts'

export const eventStableIds = new WeakMap<ChatViewEvent, string>()

export const eventStableIdState = {
  nextStableEventId: 1,
}
