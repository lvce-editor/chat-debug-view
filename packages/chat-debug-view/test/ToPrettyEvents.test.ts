import { expect, test } from '@jest/globals'
import { toPrettyEvents } from '../src/parts/ToPrettyEvents/ToPrettyEvents.ts'

test('toPrettyEvents should merge matching ai request and ai response events', () => {
  const requestEvent = {
    eventId: 1,
    requestId: 'request-1',
    type: 'ai-request',
  }
  const responseEvent = {
    eventId: 2,
    requestId: 'request-1',
    type: 'ai-response',
  }

  const result = toPrettyEvents({
    events: [requestEvent, responseEvent],
    type: 'success',
  })

  expect(result).toEqual([
    {
      eventId: 1,
      type: 'ai-request-response',
    },
  ])
})

test('toPrettyEvents should keep unmatched and non ai response events', () => {
  const requestEvent = {
    eventId: 1,
    requestId: 'request-1',
    type: 'ai-request',
  }
  const nonMatchingResponseEvent = {
    eventId: 2,
    requestId: 'request-2',
    type: 'ai-response',
  }
  const regularEvent = {
    eventId: 3,
    type: 'request',
  }

  const result = toPrettyEvents({
    events: [requestEvent, nonMatchingResponseEvent, regularEvent],
    type: 'success',
  })

  expect(result).toEqual([requestEvent, regularEvent])
})

test('toPrettyEvents should return empty array for error results', () => {
  const result = toPrettyEvents({
    error: new Error('failed'),
    type: 'error',
  })

  expect(result).toEqual([])
})