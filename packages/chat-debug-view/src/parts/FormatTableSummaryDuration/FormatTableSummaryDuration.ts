import { formatTimelineMilliseconds } from '../FormatTimelineMilliseconds/FormatTimelineMilliseconds.ts'
import { formatTimelineSeconds } from '../FormatTimelineSeconds/FormatTimelineSeconds.ts'

export const formatTableSummaryDuration = (durationMs: number): string => {
  if (durationMs < 1000) {
    return formatTimelineMilliseconds(durationMs / 1000)
  }
  return formatTimelineSeconds(durationMs / 1000)
}
