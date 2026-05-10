import { clamp } from '../Clamp/Clamp.ts'
import { parseTimelineSeconds } from '../ParseTimelineSeconds/ParseTimelineSeconds.ts'
import { roundSeconds } from '../RoundSeconds/RoundSeconds.ts'

export interface TimelineRange {
  readonly endSeconds: number | null
  readonly hasSelection: boolean
  readonly startSeconds: number | null
}

export const getNormalizedRange = (durationSeconds: number, startValue: string, endValue: string): TimelineRange => {
  const parsedStart = parseTimelineSeconds(startValue)
  const parsedEnd = parseTimelineSeconds(endValue)
  if (parsedStart === undefined && parsedEnd === undefined) {
    return {
      endSeconds: null,
      hasSelection: false,
      startSeconds: null,
    }
  }
  const rawStart = parsedStart ?? 0
  const rawEnd = parsedEnd ?? durationSeconds
  const rangeStart = Math.min(rawStart, rawEnd)
  const rangeEnd = Math.max(rawStart, rawEnd)
  const normalizedStart = clamp(rangeStart, 0, durationSeconds)
  const normalizedEnd = clamp(rangeEnd, 0, durationSeconds)
  return {
    endSeconds: roundSeconds(normalizedEnd),
    hasSelection: true,
    startSeconds: roundSeconds(normalizedStart),
  }
}
