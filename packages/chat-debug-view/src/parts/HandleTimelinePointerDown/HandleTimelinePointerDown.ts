import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { formatTimelinePresetValue } from '../FormatTimelinePresetValue/FormatTimelinePresetValue.ts'
import { getSelectionPercent } from '../GetSelectionPercent/GetSelectionPercent.ts'
import { getTimelineEventX } from '../GetTimelineEventX/GetTimelineEventX.ts'
import { getStateWithTimelineInfo } from '../GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { getTimelineLeft, getTimelineWidth } from '../GetTimelineLayout/GetTimelineLayout.ts'
import { getTimelineSecondsFromClientX } from '../GetTimelineSecondsFromClientX/GetTimelineSecondsFromClientX.ts'
import * as TimelineSelectionHandleName from '../TimelineSelectionHandleName/TimelineSelectionHandleName.ts'

const getResizeState = (state: ChatDebugViewState, name: string): ChatDebugViewState | undefined => {
  if (state.timelineInfo.startSeconds === null || state.timelineInfo.endSeconds === null) {
    return undefined
  }
  if (name === TimelineSelectionHandleName.Start) {
    return getStateWithTimelineInfo({
      ...state,
      timelineSelectionActive: true,
      timelineSelectionAnchorSeconds: formatTimelinePresetValue(state.timelineInfo.endSeconds),
      timelineSelectionFocusSeconds: formatTimelinePresetValue(state.timelineInfo.startSeconds),
    })
  }
  if (name === TimelineSelectionHandleName.End) {
    return getStateWithTimelineInfo({
      ...state,
      timelineSelectionActive: true,
      timelineSelectionAnchorSeconds: formatTimelinePresetValue(state.timelineInfo.startSeconds),
      timelineSelectionFocusSeconds: formatTimelinePresetValue(state.timelineInfo.endSeconds),
    })
  }
  return undefined
}

export const handleTimelinePointerDown = (state: ChatDebugViewState, name: string, eventX: number): ChatDebugViewState => {
  const resizeState = getResizeState(state, name)
  if (resizeState) {
    return resizeState
  }
  const timelineLeft = getTimelineLeft(state)
  const timelineWidth = getTimelineWidth(state)
  const clientX = getTimelineEventX(state, eventX)
  const seconds = getTimelineSecondsFromClientX(state.timelineEvents, clientX, timelineLeft, timelineWidth)
  console.log({ clientX, eventX, seconds, timelineLeft, timelineWidth, x: state.x })
  if (seconds === undefined) {
    return state
  }
  const timelineHoverPercent = getSelectionPercent(Number.parseFloat(seconds), state.timelineInfo.durationSeconds)
  return getStateWithTimelineInfo({
    ...state,
    timelineHoverPercent,
    timelineHoverSeconds: seconds,
    timelineSelectionActive: true,
    timelineSelectionAnchorSeconds: seconds,
    timelineSelectionFocusSeconds: seconds,
  })
}
