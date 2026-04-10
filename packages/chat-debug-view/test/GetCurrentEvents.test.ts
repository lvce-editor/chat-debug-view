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
