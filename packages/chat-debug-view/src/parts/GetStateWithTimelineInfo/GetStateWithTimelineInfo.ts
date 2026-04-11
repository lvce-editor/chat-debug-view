import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getEffectiveTimelineRange } from '../GetEffectiveTimelineRange/GetEffectiveTimelineRange.ts'
import { getTimelineFilterDescription } from '../GetTimelineFilterDescription/GetTimelineFilterDescription.ts'
import { getTimelineEvents } from '../GetTimelineEvents/GetTimelineEvents.ts'
import { getTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'

export const getStateWithTimelineInfo = (state: ChatDebugViewState): ChatDebugViewState => {
  const timelineEvents = getTimelineEvents(state)
  const effectiveRange = getEffectiveTimelineRange(
    state.timelineStartSeconds,
    state.timelineEndSeconds,
    state.timelineSelectionActive,
    state.timelineSelectionAnchorSeconds,
    state.timelineSelectionFocusSeconds,
  )
  const timelineInfo = getTimelineInfo(timelineEvents, effectiveRange.startSeconds, effectiveRange.endSeconds)
  const timelineFilterDescription = getTimelineFilterDescription(state.timelineStartSeconds, state.timelineEndSeconds)
  return {
    ...state,
    timelineFilterDescription,
    timelineEvents,
    timelineInfo,
  }
}
