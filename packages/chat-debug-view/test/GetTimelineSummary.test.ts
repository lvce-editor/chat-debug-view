import { expect, test } from '@jest/globals'
import { getTimelineSummary } from '../src/parts/GetTimelineSummary/GetTimelineSummary.ts'

test('getTimelineSummary should describe selected window', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]

  expect(getTimelineSummary(events, '5', '7')).toBe('Window 5s-7s of 10s')
})

test('getTimelineSummary should describe full window when selection is empty', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]

  expect(getTimelineSummary(events, '', '')).toBe('Window 0s-10s of 10s')
})
