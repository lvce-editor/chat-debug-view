import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { formatTimelineSeconds } from '../FormatTimelineSeconds/FormatTimelineSeconds.ts'
import { getTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'

export const getTimelineSummary = (timelineEvents: readonly ChatViewEvent[], timelineStartSeconds: string, timelineEndSeconds: string): string => {
  const timelineInfo = getTimelineInfo(timelineEvents, timelineStartSeconds, timelineEndSeconds)
  if (timelineInfo.hasSelection && timelineInfo.startSeconds !== null && timelineInfo.endSeconds !== null) {
    return `Window ${formatTimelineSeconds(timelineInfo.startSeconds)}-${formatTimelineSeconds(timelineInfo.endSeconds)} of ${formatTimelineSeconds(timelineInfo.durationSeconds)}`
  }
  return `Window 0s-${formatTimelineSeconds(timelineInfo.durationSeconds)} of ${formatTimelineSeconds(timelineInfo.durationSeconds)}`
}
