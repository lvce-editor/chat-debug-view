import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { toTimeNumber } from '../GetEventTime/GetEventTime.ts'

export const getDurationText = (event: ChatViewEvent): string => {
  const explicitDuration = event.durationMs ?? event.duration
  if (typeof explicitDuration === 'number' && Number.isFinite(explicitDuration)) {
    return `${explicitDuration}ms`
  }
  const start = toTimeNumber(event.started ?? event.startTime ?? event.startTimestamp ?? event.timestamp)
  const end = toTimeNumber(event.ended ?? event.endTime ?? event.endTimestamp ?? event.timestamp)
  if (start === undefined || end === undefined || end < start) {
    return '-'
  }
  return `${end - start}ms`
}import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { toTimeNumber } from '../GetEventTime/GetEventTime.ts'

export const getDurationText = (event: ChatViewEvent): string => {
  const explicitDuration = event.durationMs ?? event.duration
  if (typeof explicitDuration === 'number' && Number.isFinite(explicitDuration)) {
    return `${explicitDuration}ms`
  }
  const start = toTimeNumber(event.started ?? event.startTime ?? event.startTimestamp ?? event.timestamp)
  const end = toTimeNumber(event.ended ?? event.endTime ?? event.endTimestamp ?? event.timestamp)
  if (start === undefined || end === undefined || end < start) {
    return '-'
  }
  return `${end - start}ms`
}
