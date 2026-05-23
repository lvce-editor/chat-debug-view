import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getEffectiveTimelineRange } from '../GetEffectiveTimelineRange/GetEffectiveTimelineRange.ts'
import { getTableSummaries } from '../GetTableSummary/GetTableSummary.ts'
import { getTimelineEvents } from '../GetTimelineEvents/GetTimelineEvents.ts'
import { getTimelineFilterDescription } from '../GetTimelineFilterDescription/GetTimelineFilterDescription.ts'
import { getTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import { getCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'

export const getStateWithTimelineInfo = (state: ChatDebugViewState): ChatDebugViewState => {
  const timelineEvents = getTimelineEvents(state)
  const { timelineEndSeconds, timelineSelectionActive, timelineSelectionAnchorSeconds, timelineSelectionFocusSeconds, timelineStartSeconds } = state
  const effectiveRange = getEffectiveTimelineRange(
    timelineStartSeconds,
    timelineEndSeconds,
    timelineSelectionActive,
    timelineSelectionAnchorSeconds,
    timelineSelectionFocusSeconds,
  )
  const timelineInfo = getTimelineInfo(timelineEvents, effectiveRange.startSeconds, effectiveRange.endSeconds)
  const timelineFilterDescription = getTimelineFilterDescription(timelineStartSeconds, timelineEndSeconds)
  const nextState = {
    ...state,
    timelineEvents,
    timelineFilterDescription,
    timelineInfo,
  }
  return {
    ...nextState,
    summaries: getTableSummaries(getCurrentEvents(nextState)),
  }
}
