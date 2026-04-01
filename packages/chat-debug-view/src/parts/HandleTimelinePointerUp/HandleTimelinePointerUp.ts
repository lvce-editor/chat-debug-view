import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clearTimelineSelectionState } from '../ClearTimelineSelectionState/ClearTimelineSelectionState.ts'
import { formatTimelinePresetValue } from '../FormatTimelinePresetValue/FormatTimelinePresetValue.ts'
import { getTimelineEvents } from '../GetTimelineEvents/GetTimelineEvents.ts'
import { getTimelineLeft, getTimelineWidth } from '../GetTimelineLayout/GetTimelineLayout.ts'
import { getTimelineSecondsFromClientX } from '../GetTimelineSecondsFromClientX/GetTimelineSecondsFromClientX.ts'
import * as HandleInput from '../HandleInput/HandleInput.ts'
import * as InputName from '../InputName/InputName.ts'

export const handleTimelinePointerUp = (state: ChatDebugViewState, eventX: number): ChatDebugViewState => {
  if (!state.timelineSelectionActive) {
    return state
  }
  const timelineEvents = getTimelineEvents(state)
  const timelineLeft = getTimelineLeft(state)
  const timelineWidth = getTimelineWidth(state)
  const clientX = state.x + eventX
  const focusSeconds = getTimelineSecondsFromClientX(timelineEvents, clientX, timelineLeft, timelineWidth)
  if (focusSeconds === undefined) {
    return clearTimelineSelectionState(state)
  }
  const anchor = Number.parseFloat(state.timelineSelectionAnchorSeconds)
  const focus = Number.parseFloat(focusSeconds)
  const startSeconds = formatTimelinePresetValue(Math.min(anchor, focus))
  const endSeconds = formatTimelinePresetValue(Math.max(anchor, focus))
  const nextState = HandleInput.handleInput(state, InputName.TimelineRangePreset, `${startSeconds}:${endSeconds}`, false)
  return clearTimelineSelectionState(nextState)
}
