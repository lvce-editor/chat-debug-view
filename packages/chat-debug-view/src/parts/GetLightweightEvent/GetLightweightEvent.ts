import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { toTimeNumber } from '../ToTimeNumber/ToTimeNumber.ts'

const getStartTime = (event: ChatViewEvent): number | string | undefined => {
  return event.started ?? event.startTime ?? event.timestamp
}

const getEndTime = (event: ChatViewEvent): number | string | undefined => {
  return event.ended ?? event.endTime ?? event.timestamp
}

const isTimeValue = (value: number | string | undefined): value is number | string => {
  return typeof value === 'number' || typeof value === 'string'
}

const getDuration = (event: ChatViewEvent): number => {
  const explicitDuration = event.durationMs ?? event.duration
  if (typeof explicitDuration === 'number' && Number.isFinite(explicitDuration)) {
    return explicitDuration
  }
  const start = toTimeNumber(getStartTime(event))
  const end = toTimeNumber(getEndTime(event))
  if (start === undefined || end === undefined || !Number.isFinite(start) || !Number.isFinite(end)) {
    return 0
  }
  return Math.max(0, end - start)
}

export const getLightweightEvent = (event: ChatViewEvent, fallbackEventId: number): ChatViewEvent => {
  const startTime = getStartTime(event)
  const endTime = getEndTime(event)
  return {
    duration: getDuration(event),
    ...(isTimeValue(endTime) ? { endTime } : {}),
    eventId: typeof event.eventId === 'number' ? event.eventId : fallbackEventId,
    ...(isTimeValue(startTime) ? { startTime } : {}),
    type: event.type,
  }
}
