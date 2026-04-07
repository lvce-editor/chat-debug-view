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

const eventsWithoutTime: readonly ChatViewEvent[] = [
  {
    sessionId: 'session-1',
    type: 'request',
  },
  {
    sessionId: 'session-1',
    timestamp: 'invalid',
    type: 'response',
  },
]

const zeroDurationEvents: readonly ChatViewEvent[] = [
  {
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:00:00.000Z',
    type: 'request',
  },
  {
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:00:00.000Z',
    type: 'response',
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
  expect(result.selectionStartPercent).toBe(50)
  expect(result.selectionEndPercent).toBe(70)
  expect(result.buckets.some((bucket) => bucket.count > 0)).toBe(true)
})

test('getTimelineInfo should expose null marker positions when no selection exists', () => {
  const result = GetTimelineInfo.getTimelineInfo(events, '', '')

  expect(result.hasSelection).toBe(false)
  expect(result.selectionStartPercent).toBeNull()
  expect(result.selectionEndPercent).toBeNull()
})

test('getTimelineInfo should ignore invalid timeline range values', () => {
  const result = GetTimelineInfo.getTimelineInfo(events, '-1', 'nope')

  expect(result.hasSelection).toBe(false)
  expect(result.startSeconds).toBeNull()
  expect(result.endSeconds).toBeNull()
  expect(result.selectionStartPercent).toBeNull()
  expect(result.selectionEndPercent).toBeNull()
})

test('getTimelineDurationSeconds should return zero when no events have a valid time', () => {
  const result = GetTimelineInfo.getTimelineDurationSeconds(eventsWithoutTime)

  expect(result).toBe(0)
})

test('getTimelineInfo should return zero selection percentages for zero-duration ranges', () => {
  const result = GetTimelineInfo.getTimelineInfo(zeroDurationEvents, '0', '0')

  expect(result.durationSeconds).toBe(0)
  expect(result.hasSelection).toBe(true)
  expect(result.startSeconds).toBe(0)
  expect(result.endSeconds).toBe(0)
  expect(result.selectionStartPercent).toBe(0)
  expect(result.selectionEndPercent).toBe(0)
  expect(result.buckets).toEqual([
    {
      count: 2,
      endSeconds: 0,
      isSelected: true,
      startSeconds: 0,
      unitCount: 8,
    },
  ])
})
