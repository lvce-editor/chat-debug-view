import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clearTimelineSelectionState } from '../ClearTimelineSelectionState/ClearTimelineSelectionState.ts'
import { formatTimelinePresetValue } from '../FormatTimelinePresetValue/FormatTimelinePresetValue.ts'
import { getSelectionPercent } from '../GetSelectionPercent/GetSelectionPercent.ts'
import { getTimelineEventX } from '../GetTimelineEventX/GetTimelineEventX.ts'
import { getTimelineLeft, getTimelineWidth } from '../GetTimelineLayout/GetTimelineLayout.ts'
import { getTimelineSecondsFromClientX } from '../GetTimelineSecondsFromClientX/GetTimelineSecondsFromClientX.ts'
import * as HandleTimelineInput from '../HandleTimelineInput/HandleTimelineInput.ts'

export const handleTimelinePointerUp = (state: ChatDebugViewState, eventX: number): ChatDebugViewState => {
  if (!state.timelineSelectionActive) {
    return state
  }
  const timelineLeft = getTimelineLeft(state)
  const timelineWidth = getTimelineWidth(state)
  const clientX = getTimelineEventX(eventX)
  const focusSeconds = getTimelineSecondsFromClientX(state.timelineEvents, clientX, timelineLeft, timelineWidth)
  if (focusSeconds === undefined) {
    return clearTimelineSelectionState(state)
  }
  const timelineHoverPercent = getSelectionPercent(Number.parseFloat(focusSeconds), state.timelineInfo.durationSeconds)
  const anchor = Number.parseFloat(state.timelineSelectionAnchorSeconds)
  const focus = Number.parseFloat(focusSeconds)
  const startSeconds = formatTimelinePresetValue(Math.min(anchor, focus))
  const endSeconds = formatTimelinePresetValue(Math.max(anchor, focus))
  const nextState = HandleTimelineInput.handleTimelineRangePreset(state, `${startSeconds}:${endSeconds}`)
  return clearTimelineSelectionState({
    ...nextState,
    timelineHoverPercent,
    timelineHoverSeconds: focusSeconds,
  })
}
