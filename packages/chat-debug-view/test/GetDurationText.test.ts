import { expect, test } from '@jest/globals'
import { getDurationText } from '../src/parts/GetDurationText/GetDurationText.ts'

test('getDurationText should prefer explicit durationMs', () => {
  const event = {
    durationMs: 42,
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }

  expect(getDurationText(event)).toBe('42ms')
})

test('getDurationText should format explicit second-range durations with one decimal place', () => {
  const event = {
    durationMs: 2000,
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }

  expect(getDurationText(event)).toBe('2.0s')
})

test('getDurationText should compute duration from started and ended timestamps', () => {
  const event = {
    ended: '2026-03-08T00:00:01.250Z',
    eventId: 1,
    sessionId: 'session-1',
    started: '2026-03-08T00:00:01.000Z',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'request',
  }

  expect(getDurationText(event)).toBe('250ms')
})

test('getDurationText should format computed second-range durations with one decimal place', () => {
  const event = {
    ended: '2026-03-08T00:00:01.234Z',
    eventId: 1,
    sessionId: 'session-1',
    started: '2026-03-08T00:00:00.000Z',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }

  expect(getDurationText(event)).toBe('1.2s')
})

test('getDurationText should return dash for invalid ranges', () => {
  const event = {
    ended: '2026-03-08T00:00:01.000Z',
    eventId: 1,
    sessionId: 'session-1',
    started: '2026-03-08T00:00:01.250Z',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'request',
  }

  expect(getDurationText(event)).toBe('-')
})
