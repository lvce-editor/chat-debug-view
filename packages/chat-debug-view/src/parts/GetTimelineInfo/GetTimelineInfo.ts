import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventTime } from '../GetEventTime/GetEventTime.ts'

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
  readonly startSeconds: number | null
}

interface EventWithTime {
  readonly event: ChatViewEvent
  readonly time: number
}

const parseTimelineSeconds = (value: string): number | undefined => {
  const trimmed = value.trim()
  if (!trimmed) {
    return undefined
  }
  const parsed = Number.parseFloat(trimmed)
  if (!Number.isFinite(parsed) || parsed < 0) {
    return undefined
  }
  return parsed
}

const roundSeconds = (value: number): number => {
  return Number(value.toFixed(3))
}

const getEventsWithTime = (events: readonly ChatViewEvent[]): readonly EventWithTime[] => {
  return events.flatMap((event) => {
    const time = getEventTime(event)
    if (time === undefined) {
      return []
    }
    return [{ event, time }]
  })
}

const getNormalizedRange = (
  durationSeconds: number,
  startValue: string,
  endValue: string,
): { readonly endSeconds: number | null; readonly hasSelection: boolean; readonly startSeconds: number | null } => {
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
  const normalizedStart = Math.max(0, Math.min(durationSeconds, Math.min(rawStart, rawEnd)))
  const normalizedEnd = Math.max(0, Math.min(durationSeconds, Math.max(rawStart, rawEnd)))
  return {
    endSeconds: roundSeconds(normalizedEnd),
    hasSelection: true,
    startSeconds: roundSeconds(normalizedStart),
  }
}

export const filterEventsByTimelineRange = (
  events: readonly ChatViewEvent[],
  startValue: string,
  endValue: string,
): readonly ChatViewEvent[] => {
  const eventsWithTime = getEventsWithTime(events)
  if (eventsWithTime.length === 0) {
    return events
  }
  const baseTime = eventsWithTime[0].time
  const lastTime = eventsWithTime[eventsWithTime.length - 1].time
  const durationSeconds = roundSeconds(Math.max(0, lastTime - baseTime) / 1000)
  const range = getNormalizedRange(durationSeconds, startValue, endValue)
  if (!range.hasSelection || range.startSeconds === null || range.endSeconds === null) {
    return events
  }
  const startTime = baseTime + range.startSeconds * 1000
  const endTime = baseTime + range.endSeconds * 1000
  return eventsWithTime.filter((item) => item.time >= startTime && item.time <= endTime).map((item) => item.event)
}

export const getTimelineInfo = (events: readonly ChatViewEvent[], startValue: string, endValue: string): TimelineInfo => {
  const eventsWithTime = getEventsWithTime(events)
  if (eventsWithTime.length === 0) {
    return {
      buckets: [],
      durationSeconds: 0,
      endSeconds: null,
      hasSelection: false,
      startSeconds: null,
    }
  }
  const baseTime = eventsWithTime[0].time
  const lastTime = eventsWithTime[eventsWithTime.length - 1].time
  const durationMs = Math.max(0, lastTime - baseTime)
  const durationSeconds = roundSeconds(durationMs / 1000)
  const range = getNormalizedRange(durationSeconds, startValue, endValue)
  const bucketCount = durationSeconds === 0 ? 1 : Math.max(12, Math.min(48, Math.ceil(durationSeconds)))
  const bucketDurationMs = durationMs === 0 ? 1000 : durationMs / bucketCount
  const counts = new Array<number>(bucketCount).fill(0)
  for (const item of eventsWithTime) {
    const offsetMs = item.time - baseTime
    const index = durationMs === 0 ? 0 : Math.min(bucketCount - 1, Math.floor((offsetMs / durationMs) * bucketCount))
    counts[index] += 1
  }
  const maxCount = Math.max(...counts)
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
    startSeconds: range.startSeconds,
  }
}