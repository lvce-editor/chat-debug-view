import { expect, test } from '@jest/globals'
import { getTableSummaries } from '../src/parts/GetTableSummary/GetTableSummary.ts'

test('getTableSummaries should render singular summary for one event', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
      sessionId: 'session-1',
      started: '2026-03-08T00:00:01.000Z',
      subType: 'request',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]

  expect(getTableSummaries(events)).toEqual(['1 request', 'Finish 250ms'])
})

test('getTableSummaries should render plural summary for multiple events', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:00.250Z',
      eventId: 1,
      sessionId: 'session-1',
      started: '2026-03-08T00:00:00.000Z',
      subType: 'request',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      ended: '2026-03-08T00:00:02.500Z',
      eventId: 2,
      sessionId: 'session-1',
      started: '2026-03-08T00:00:02.000Z',
      subType: 'response',
      timestamp: '2026-03-08T00:00:02.000Z',
      type: 'response',
    },
  ]

  expect(getTableSummaries(events)).toEqual(['2 requests', 'Finish 2.5s'])
})

test('getTableSummaries should fall back to zero milliseconds when events have no valid time range', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      subType: 'request',
      timestamp: 'invalid',
      type: 'request',
    },
  ]

  expect(getTableSummaries(events)).toEqual(['1 request', 'Finish 0ms'])
})
