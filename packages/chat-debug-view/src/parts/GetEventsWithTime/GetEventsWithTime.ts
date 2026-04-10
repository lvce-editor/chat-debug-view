import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventTime } from '../GetEventTime/GetEventTime.ts'

export interface EventWithTime {
  readonly event: ChatViewEvent
  readonly time: number
}

export const getEventsWithTime = (events: readonly ChatViewEvent[]): readonly EventWithTime[] => {
  return events.flatMap((event) => {
    const time = getEventTime(event)
    if (time === undefined) {
      return []
    }
    return [{ event, time }]
  })
}
