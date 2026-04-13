import type { TimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { formatTimelineSeconds } from '../FormatTimelineSeconds/FormatTimelineSeconds.ts'

export const getTimelineSummary = (timelineInfo: TimelineInfo): string => {
  if (timelineInfo.durationSeconds === 0) {
    return ''
  }
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
