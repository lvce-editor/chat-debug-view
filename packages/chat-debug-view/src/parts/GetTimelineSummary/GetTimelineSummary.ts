import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { formatTimelineSeconds } from '../FormatTimelineSeconds/FormatTimelineSeconds.ts'
import { getTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'

export const getTimelineSummary = (timelineEvents: readonly ChatViewEvent[], timelineStartSeconds: string, timelineEndSeconds: string): string => {
  const timelineInfo = getTimelineInfo(timelineEvents, timelineStartSeconds, timelineEndSeconds)
  if (timelineInfo.hasSelection && timelineInfo.startSeconds !== null && timelineInfo.endSeconds !== null) {
    return ChatDebugStrings.windowSummary(
      formatTimelineSeconds(timelineInfo.startSeconds),
      formatTimelineSeconds(timelineInfo.endSeconds),
      formatTimelineSeconds(timelineInfo.durationSeconds),
    )
  }
  return ChatDebugStrings.windowSummary(
    '0s',
    formatTimelineSeconds(timelineInfo.durationSeconds),
    formatTimelineSeconds(timelineInfo.durationSeconds),
  )
}
