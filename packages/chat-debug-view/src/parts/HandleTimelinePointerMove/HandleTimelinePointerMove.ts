import { getTimelineEvents } from '../GetTimelineEvents/GetTimelineEvents.ts'
import { getTimelineSecondsFromClientX } from '../GetTimelineSecondsFromClientX/GetTimelineSecondsFromClientX.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const handleTimelinePointerMove = (state: ChatDebugViewState, eventX: number): ChatDebugViewState => {
  if (!state.timelineSelectionActive) {
    return state
  }
  const timelineEvents = getTimelineEvents(state)
  const seconds = getTimelineSecondsFromClientX(timelineEvents, eventX, state.timelineSelectionLeft, state.timelineSelectionWidth)
  if (seconds === undefined) {
    return state
  }
  return {
    ...state,
    timelineSelectionFocusSeconds: seconds,
  }
}