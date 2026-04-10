import { expect, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import { filterEventsByTimelineRange } from '../src/parts/FilterEventsByTimelineRange/FilterEventsByTimelineRange.ts'

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
    timestamp: '2026-01-01T10:00:05.500Z',
    type: 'response',
  },
  {
    eventId: 3,
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:00:06.500Z',
    type: 'tool-execution-started',
  },
  {
    eventId: 4,
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:00:10.000Z',
    type: 'event-stream-finished',
  },
]

test('filterEventsByTimelineRange should filter events between start and end seconds', () => {
  const result = filterEventsByTimelineRange(events, '5', '7')

  expect(result).toEqual([events[1], events[2]])
})

test('filterEventsByTimelineRange should return original events when the range is invalid', () => {
  const result = filterEventsByTimelineRange(events, '-1', 'nope')

  expect(result).toEqual(events)
})