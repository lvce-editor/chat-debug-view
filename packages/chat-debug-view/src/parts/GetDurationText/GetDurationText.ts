import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { formatDurationSeconds } from '../FormatDurationSeconds/FormatDurationSeconds.ts'
import { toTimeNumber } from '../ToTimeNumber/ToTimeNumber.ts'

const formatDurationText = (durationMs: number): string => {
  if (durationMs >= 1000) {
    return formatDurationSeconds(durationMs / 1000)
  }
  return `${durationMs}ms`
}

export const getDurationText = (event: ChatViewEvent): string => {
  if (event.time) {
    return event.time
  }
  const explicitDuration = event.durationMs ?? event.duration
  if (typeof explicitDuration === 'number' && Number.isFinite(explicitDuration)) {
    return formatDurationText(explicitDuration)
  }
  const start = toTimeNumber(event.started ?? event.startTime ?? event.startTimestamp ?? event.timestamp)
  const end = toTimeNumber(event.ended ?? event.endTime ?? event.endTimestamp ?? event.timestamp)
  if (start === undefined || end === undefined || end < start) {
    return '-'
  }
  return formatDurationText(end - start)
}
