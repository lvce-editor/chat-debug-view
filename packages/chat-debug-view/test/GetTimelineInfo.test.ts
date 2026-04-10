import { expect, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import { getTimelineInfo } from '../src/parts/GetTimelineInfo/GetTimelineInfo.ts'

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

const zeroDurationEvents: readonly ChatViewEvent[] = [
  {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:00:00.000Z',
    type: 'request',
  },
  {
    eventId: 2,
    sessionId: 'session-1',
    timestamp: '2026-01-01T10:00:00.000Z',
    type: 'response',
  },
]

test('getTimelineInfo should describe total duration and active window', () => {
  const result = getTimelineInfo(events, '5', '7')
  expect(result.durationSeconds).toBe(10)
  expect(result.startSeconds).toBe(5)
  expect(result.endSeconds).toBe(7)
  expect(result.hasSelection).toBe(true)
  expect(result.selectionStartPercent).toBe(50)
  expect(result.selectionEndPercent).toBe(70)
  expect(result.buckets.some((bucket) => bucket.count > 0)).toBe(true)
})

test('getTimelineInfo should expose null marker positions when no selection exists', () => {
  const result = getTimelineInfo(events, '', '')

  expect(result.hasSelection).toBe(false)
  expect(result.selectionStartPercent).toBeNull()
  expect(result.selectionEndPercent).toBeNull()
})

test('getTimelineInfo should ignore invalid timeline range values', () => {
  const result = getTimelineInfo(events, '-1', 'nope')

  expect(result.hasSelection).toBe(false)
  expect(result.startSeconds).toBeNull()
  expect(result.endSeconds).toBeNull()
  expect(result.selectionStartPercent).toBeNull()
  expect(result.selectionEndPercent).toBeNull()
})

test('getTimelineInfo should return zero selection percentages for zero-duration ranges', () => {
  const result = getTimelineInfo(zeroDurationEvents, '0', '0')

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
