import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const hasTimingDetails = (event: ChatViewEvent): boolean => {
  const hasDuration = typeof event.duration === 'number' || typeof event.durationMs === 'number'
  const hasStart = event.started !== undefined || event.startTime !== undefined || event.startTimestamp !== undefined
  const hasEnd = event.ended !== undefined || event.endTime !== undefined || event.endTimestamp !== undefined
  return hasDuration || (hasStart && hasEnd)
}
