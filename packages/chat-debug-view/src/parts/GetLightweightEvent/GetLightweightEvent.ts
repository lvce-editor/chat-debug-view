import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { toTimeNumber } from '../ToTimeNumber/ToTimeNumber.ts'

const getStartTime = (event: ChatViewEvent): number | string | undefined => {
  return event.started ?? event.startTime ?? event.timestamp
}

const getEndTime = (event: ChatViewEvent): number | string | undefined => {
  return event.ended ?? event.endTime ?? event.timestamp
}

const getDuration = (event: ChatViewEvent): number => {
  const explicitDuration = event.durationMs ?? event.duration
  if (typeof explicitDuration === 'number' && Number.isFinite(explicitDuration)) {
    return explicitDuration
  }
  const start = toTimeNumber(getStartTime(event))
  const end = toTimeNumber(getEndTime(event))
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return 0
  }
  return Math.max(0, end - start)
}

export const getLightweightEvent = (event: ChatViewEvent, eventId: number): ChatViewEvent => {
  return {
    duration: getDuration(event),
    endTime: getEndTime(event),
    eventId,
    startTime: getStartTime(event),
    type: event.type,
  }
}