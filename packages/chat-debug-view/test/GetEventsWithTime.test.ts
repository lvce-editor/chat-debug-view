import { expect, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import { getEventsWithTime } from '../src/parts/GetEventsWithTime/GetEventsWithTime.ts'

test('getEventsWithTime should keep only events with a valid timestamp', () => {
  const events: readonly ChatViewEvent[] = [
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-01-01T10:00:00.000Z',
      type: 'request',
    },
    {
      eventId: 2,
      sessionId: 'session-1',
      type: 'response',
    },
    {
      eventId: 3,
      sessionId: 'session-1',
      timestamp: 'invalid',
      type: 'response',
    },
  ]

  const result = getEventsWithTime(events)

  expect(result).toEqual([
    {
      event: events[0],
      time: Date.parse('2026-01-01T10:00:00.000Z'),
    },
  ])
})
