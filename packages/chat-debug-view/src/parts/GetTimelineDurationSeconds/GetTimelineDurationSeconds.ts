import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventsWithTime } from '../GetEventsWithTime/GetEventsWithTime.ts'
import { roundSeconds } from '../RoundSeconds/RoundSeconds.ts'

export const getTimelineDurationSeconds = (events: readonly ChatViewEvent[]): number => {
  const eventsWithTime = getEventsWithTime(events)
  if (eventsWithTime.length === 0) {
    return 0
  }
  const baseTime = eventsWithTime[0].time
  const lastTime = eventsWithTime.at(-1)?.time ?? baseTime
  return roundSeconds(Math.max(0, lastTime - baseTime) / 1000)
}
