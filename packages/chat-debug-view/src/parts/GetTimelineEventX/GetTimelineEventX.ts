import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const getTimelineEventX = (state: ChatDebugViewState, eventX: number): number => {
  return eventX - state.x
}
