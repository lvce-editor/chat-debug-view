import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventsWithTime } from '../GetEventsWithTime/GetEventsWithTime.ts'
import { getNormalizedRange } from '../GetNormalizedRange/GetNormalizedRange.ts'
import { roundSeconds } from '../RoundSeconds/RoundSeconds.ts'

export const filterEventsByTimelineRange = (events: readonly ChatViewEvent[], startValue: string, endValue: string): readonly ChatViewEvent[] => {
  const eventsWithTime = getEventsWithTime(events)
  if (eventsWithTime.length === 0) {
    return events
  }
  const baseTime = eventsWithTime[0].time
  const lastTime = eventsWithTime.at(-1)?.time ?? baseTime
  const durationSeconds = roundSeconds(Math.max(0, lastTime - baseTime) / 1000)
  const range = getNormalizedRange(durationSeconds, startValue, endValue)
  if (!range.hasSelection || range.startSeconds === null || range.endSeconds === null) {
    return events
  }
  const startTime = baseTime + range.startSeconds * 1000
  const endTime = baseTime + range.endSeconds * 1000
  return eventsWithTime.filter((item) => item.time >= startTime && item.time <= endTime).map((item) => item.event)
}