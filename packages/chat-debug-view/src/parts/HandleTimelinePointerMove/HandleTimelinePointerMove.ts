import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getStateWithTimelineInfo } from '../GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { getTimelineLeft, getTimelineWidth } from '../GetTimelineLayout/GetTimelineLayout.ts'
import { getTimelineSecondsFromClientX } from '../GetTimelineSecondsFromClientX/GetTimelineSecondsFromClientX.ts'

export const handleTimelinePointerMove = (state: ChatDebugViewState, eventX: number): ChatDebugViewState => {
  if (!state.timelineSelectionActive) {
    return state
  }
  const timelineLeft = getTimelineLeft(state)
  const timelineWidth = getTimelineWidth(state)
  const clientX = state.x + eventX
  const seconds = getTimelineSecondsFromClientX(state.timelineEvents, clientX, timelineLeft, timelineWidth)
  if (seconds === undefined) {
    return state
  }
  return getStateWithTimelineInfo({
    ...state,
    timelineSelectionFocusSeconds: seconds,
  })
}
