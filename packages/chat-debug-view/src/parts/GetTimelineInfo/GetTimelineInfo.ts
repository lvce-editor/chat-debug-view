import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventsWithTime } from '../GetEventsWithTime/GetEventsWithTime.ts'
import { getNormalizedRange } from '../GetNormalizedRange/GetNormalizedRange.ts'
import { getSelectionPercent } from '../GetSelectionPercent/GetSelectionPercent.ts'
import { roundSeconds } from '../RoundSeconds/RoundSeconds.ts'

const maxBarUnits = 8

export interface TimelineBucket {
  readonly count: number
  readonly endSeconds: number
  readonly isSelected: boolean
  readonly startSeconds: number
  readonly unitCount: number
}

export interface TimelineInfo {
  readonly buckets: readonly TimelineBucket[]
  readonly durationSeconds: number
  readonly endSeconds: number | null
  readonly hasSelection: boolean
  readonly selectionEndPercent: number | null
  readonly selectionStartPercent: number | null
  readonly startSeconds: number | null
}

export const getTimelineInfo = (events: readonly ChatViewEvent[], startValue: string, endValue: string): TimelineInfo => {
  const eventsWithTime = getEventsWithTime(events)
  if (eventsWithTime.length === 0) {
    return {
      buckets: [],
      durationSeconds: 0,
      endSeconds: null,
      hasSelection: false,
      selectionEndPercent: null,
      selectionStartPercent: null,
      startSeconds: null,
    }
  }
  const baseTime = eventsWithTime[0].time
  const lastTime = eventsWithTime.at(-1)?.time ?? baseTime
  const durationMs = Math.max(0, lastTime - baseTime)
  const durationSeconds = roundSeconds(durationMs / 1000)
  const range = getNormalizedRange(durationSeconds, startValue, endValue)
  const bucketCount = durationSeconds === 0 ? 1 : Math.max(12, Math.min(48, Math.ceil(durationSeconds)))
  const bucketDurationMs = durationMs === 0 ? 1000 : durationMs / bucketCount
  const counts = Array.from<number>({ length: bucketCount }).fill(0)
  for (const item of eventsWithTime) {
    const offsetMs = item.time - baseTime
    const index = durationMs === 0 ? 0 : Math.min(bucketCount - 1, Math.floor((offsetMs / durationMs) * bucketCount))
    counts[index] += 1
  }
  const maxCount = Math.max(...counts)
  const selectionStartPercent = range.hasSelection && range.startSeconds !== null ? getSelectionPercent(range.startSeconds, durationSeconds) : null
  const selectionEndPercent = range.hasSelection && range.endSeconds !== null ? getSelectionPercent(range.endSeconds, durationSeconds) : null
  const buckets = counts.map((count, index) => {
    const bucketStartMs = index * bucketDurationMs
    const bucketEndMs = index === bucketCount - 1 ? durationMs : (index + 1) * bucketDurationMs
    const hasSelection = range.hasSelection && range.startSeconds !== null && range.endSeconds !== null
    const selectionStartMs = hasSelection ? range.startSeconds * 1000 : 0
    const selectionEndMs = hasSelection ? range.endSeconds * 1000 : 0
    return {
      count,
      endSeconds: roundSeconds(bucketEndMs / 1000),
      isSelected: hasSelection && bucketEndMs >= selectionStartMs && bucketStartMs <= selectionEndMs,
      startSeconds: roundSeconds(bucketStartMs / 1000),
      unitCount: count === 0 ? 0 : Math.max(1, Math.round((count / maxCount) * maxBarUnits)),
    }
  })
  return {
    buckets,
    durationSeconds,
    endSeconds: range.endSeconds,
    hasSelection: range.hasSelection,
    selectionEndPercent,
    selectionStartPercent,
    startSeconds: range.startSeconds,
  }
}
