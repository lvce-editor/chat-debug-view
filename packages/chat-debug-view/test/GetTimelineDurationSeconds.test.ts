import { expect, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import { getTimelineDurationSeconds } from '../src/parts/GetTimelineDurationSeconds/GetTimelineDurationSeconds.ts'

test('getTimelineDurationSeconds should return the elapsed seconds between first and last timed events', () => {
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
  ]

  const result = getTimelineDurationSeconds(events)

  expect(result).toBe(5.5)
})

test('getTimelineDurationSeconds should return zero when no events have a valid time', () => {
  const events: readonly ChatViewEvent[] = [
    {
      eventId: 1,
      sessionId: 'session-1',
      type: 'request',
    },
    {
      eventId: 2,
      sessionId: 'session-1',
      timestamp: 'invalid',
      type: 'response',
    },
  ]

  const result = getTimelineDurationSeconds(events)

  expect(result).toBe(0)
})