import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { formatTimelineSeconds } from '../FormatTimelineSeconds/FormatTimelineSeconds.ts'
import { getTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'

export const getTimelineSummary = (
  timelineEvents: readonly ChatViewEvent[],
  timelineStartSeconds: string,
  timelineEndSeconds: string,
): string => {
  const timelineInfo = getTimelineInfo(timelineEvents, timelineStartSeconds, timelineEndSeconds)
  if (timelineInfo.hasSelection && timelineInfo.startSeconds !== null && timelineInfo.endSeconds !== null) {
    return `Window ${formatTimelineSeconds(timelineInfo.startSeconds)}-${formatTimelineSeconds(timelineInfo.endSeconds)} of ${formatTimelineSeconds(timelineInfo.durationSeconds)}`
  }
  return `Window 0s-${formatTimelineSeconds(timelineInfo.durationSeconds)} of ${formatTimelineSeconds(timelineInfo.durationSeconds)}`
}import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getTimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'

const formatTimelineSeconds = (value: number): string => {
  if (Number.isInteger(value)) {
    return `${value}s`
  }
  return `${Number(value.toFixed(1))}s`
}

export const getTimelineSummary = (timelineEvents: readonly ChatViewEvent[], timelineStartSeconds: string, timelineEndSeconds: string): string => {
  const timelineInfo = getTimelineInfo(timelineEvents, timelineStartSeconds, timelineEndSeconds)
  if (timelineInfo.hasSelection && timelineInfo.startSeconds !== null && timelineInfo.endSeconds !== null) {
    return `Window ${formatTimelineSeconds(timelineInfo.startSeconds)}-${formatTimelineSeconds(timelineInfo.endSeconds)} of ${formatTimelineSeconds(timelineInfo.durationSeconds)}`
  }
  return `Window 0s-${formatTimelineSeconds(timelineInfo.durationSeconds)} of ${formatTimelineSeconds(timelineInfo.durationSeconds)}`
}
