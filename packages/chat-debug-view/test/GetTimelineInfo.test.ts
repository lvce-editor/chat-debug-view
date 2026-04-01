import { expect, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import * as GetTimelineInfo from '../src/parts/GetTimelineInfo/GetTimelineInfo.ts'

const events: readonly ChatViewEvent[] = [
  {
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:00:00.000Z',
    type: 'request',
  },
  {
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:00:05.500Z',
    type: 'response',
  },
  {
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:00:06.500Z',
    type: 'tool-execution-started',
  },
  {
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:00:10.000Z',
    type: 'event-stream-finished',
  },
]

test('filterEventsByTimelineRange should filter events between start and end seconds', () => {
  const result = GetTimelineInfo.filterEventsByTimelineRange(events, '5', '7')
  expect(result).toEqual([events[1], events[2]])
})

test('getTimelineInfo should describe total duration and active window', () => {
  const result = GetTimelineInfo.getTimelineInfo(events, '5', '7')
  expect(result.durationSeconds).toBe(10)
  expect(result.startSeconds).toBe(5)
  expect(result.endSeconds).toBe(7)
  expect(result.hasSelection).toBe(true)
  expect(result.buckets.some((bucket) => bucket.count > 0)).toBe(true)
})
