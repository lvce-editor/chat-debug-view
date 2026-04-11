import { expect, test } from '@jest/globals'
import { getTableSummary } from '../src/parts/GetTableSummary/GetTableSummary.ts'

test('getTableSummary should render singular summary for one event', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
      sessionId: 'session-1',
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]

  expect(getTableSummary(events)).toBe('1 event, 250ms from start to finish')
})

test('getTableSummary should render plural summary for multiple events', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:00.250Z',
      eventId: 1,
      sessionId: 'session-1',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      ended: '2026-03-08T00:00:02.500Z',
      eventId: 2,
      sessionId: 'session-1',
      started: '2026-03-08T00:00:02.000Z',
      timestamp: '2026-03-08T00:00:02.000Z',
      type: 'response',
    },
  ]

  expect(getTableSummary(events)).toBe('2 events, 2.5s from start to finish')
})

test('getTableSummary should fall back to zero milliseconds when events have no valid time range', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: 'invalid',
      type: 'request',
    },
  ]

  expect(getTableSummary(events)).toBe('1 event, 0ms from start to finish')
})
