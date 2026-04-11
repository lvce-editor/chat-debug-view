import { expect, test } from '@jest/globals'
import { getCurrentEvents } from '../src/parts/LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getCurrentEvents should apply event filters and timeline range', () => {
  const requestEvent = {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }
  const responseEvent = {
    eventId: 2,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'response',
  }
  const state = {
    ...createDefaultState(),
    events: [requestEvent, responseEvent],
    filterValue: 'response',
    timelineEndSeconds: '1.5',
    timelineStartSeconds: '0.5',
  }

  const result = getCurrentEvents(state)

  expect(result).toEqual([responseEvent])
})

test('getCurrentEvents should sort by selected table column', () => {
  const responseEvent = {
    eventId: 2,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'response',
  }
  const requestEvent = {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }
  const state = {
    ...createDefaultState(),
    events: [responseEvent, requestEvent],
    sortColumn: 'type',
    sortDescending: false,
  }

  const result = getCurrentEvents(state)

  expect(result).toEqual([requestEvent, responseEvent])
})
