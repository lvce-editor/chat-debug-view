import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getTimelineEvents } from '../GetTimelineEvents/GetTimelineEvents.ts'
import { getTimelineLeft, getTimelineWidth } from '../GetTimelineLayout/GetTimelineLayout.ts'
import { getTimelineSecondsFromClientX } from '../GetTimelineSecondsFromClientX/GetTimelineSecondsFromClientX.ts'

export const handleTimelinePointerDown = (state: ChatDebugViewState, eventX: number): ChatDebugViewState => {
  const timelineEvents = getTimelineEvents(state)
  const timelineLeft = getTimelineLeft(state)
  const timelineWidth = getTimelineWidth(state)
  const seconds = getTimelineSecondsFromClientX(timelineEvents, eventX, timelineLeft, timelineWidth)
  if (seconds === undefined) {
    return state
  }
  return {
    ...state,
    timelineSelectionActive: true,
    timelineSelectionAnchorSeconds: seconds,
    timelineSelectionFocusSeconds: seconds,
  }
}
