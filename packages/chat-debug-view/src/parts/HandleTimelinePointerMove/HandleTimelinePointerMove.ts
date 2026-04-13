import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getSelectionPercent } from '../GetSelectionPercent/GetSelectionPercent.ts'
import { getStateWithTimelineInfo } from '../GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { getTimelineEventX } from '../GetTimelineEventX/GetTimelineEventX.ts'
import { getTimelineLeft, getTimelineWidth } from '../GetTimelineLayout/GetTimelineLayout.ts'
import { getTimelineSecondsFromClientX } from '../GetTimelineSecondsFromClientX/GetTimelineSecondsFromClientX.ts'

export const handleTimelinePointerMove = (state: ChatDebugViewState, eventX: number): ChatDebugViewState => {
  const timelineLeft = getTimelineLeft(state)
  const timelineWidth = getTimelineWidth(state)
  const clientX = getTimelineEventX(eventX)
  const seconds = getTimelineSecondsFromClientX(state.timelineEvents, clientX, timelineLeft, timelineWidth)
  if (seconds === undefined) {
    return state
  }
  const timelineHoverPercent = getSelectionPercent(Number.parseFloat(seconds), state.timelineInfo.durationSeconds)
  if (!state.timelineSelectionActive) {
    return {
      ...state,
      timelineHoverPercent,
      timelineHoverSeconds: seconds,
    }
  }
  return getStateWithTimelineInfo({
    ...state,
    timelineHoverPercent,
    timelineHoverSeconds: seconds,
    timelineSelectionFocusSeconds: seconds,
  })
}
