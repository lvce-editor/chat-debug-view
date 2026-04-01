import { clearTimelineSelectionState } from '../ClearTimelineSelectionState/ClearTimelineSelectionState.ts'
import { formatTimelinePresetValue } from '../FormatTimelinePresetValue/FormatTimelinePresetValue.ts'
import { getTimelineEvents } from '../GetTimelineEvents/GetTimelineEvents.ts'
import { getTimelineSecondsFromClientX } from '../GetTimelineSecondsFromClientX/GetTimelineSecondsFromClientX.ts'
import * as HandleInput from '../HandleInput/HandleInput.ts'
import * as InputName from '../InputName/InputName.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const handleTimelinePointerUp = (state: ChatDebugViewState, eventX: number): ChatDebugViewState => {
  if (!state.timelineSelectionActive) {
    return state
  }
  const timelineEvents = getTimelineEvents(state)
  const focusSeconds = getTimelineSecondsFromClientX(timelineEvents, eventX, state.timelineSelectionLeft, state.timelineSelectionWidth)
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
