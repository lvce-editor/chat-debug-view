import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { formatTimelineMilliseconds } from '../FormatTimelineMilliseconds/FormatTimelineMilliseconds.ts'
import { formatTimelineSeconds } from '../FormatTimelineSeconds/FormatTimelineSeconds.ts'
import { getEndTime } from '../GetEndTime/GetEndTime.ts'
import { getStartTime } from '../GetStartTime/GetStartTime.ts'
import { toTimeNumber } from '../ToTimeNumber/ToTimeNumber.ts'

const formatTableSummaryDuration = (durationMs: number): string => {
  if (durationMs < 1000) {
    return formatTimelineMilliseconds(durationMs / 1000)
  }
  return formatTimelineSeconds(durationMs / 1000)
}

export const getTableSummary = (events: readonly ChatViewEvent[]): string => {
  let minStart = Number.POSITIVE_INFINITY
  let maxEnd = Number.NEGATIVE_INFINITY

  for (const event of events) {
    const startTime = toTimeNumber(getStartTime(event))
    const endTime = toTimeNumber(getEndTime(event))

    if (typeof startTime === 'number' && Number.isFinite(startTime)) {
      minStart = Math.min(minStart, startTime)
    }

    if (typeof endTime === 'number' && Number.isFinite(endTime)) {
      maxEnd = Math.max(maxEnd, endTime)
    }
  }

  const durationMs = Number.isFinite(minStart) && Number.isFinite(maxEnd) ? Math.max(0, maxEnd - minStart) : 0

  return ChatDebugStrings.tableSummary(events.length, formatTableSummaryDuration(durationMs))
}
