import { expect, test } from '@jest/globals'
import { getResponseMap } from '../src/parts/GetResponseMap/GetResponseMap.ts'

test('getResponseMap should return ai responses by request id', () => {
  const events = [
    {
      eventId: 1,
      requestId: 'request-1',
      type: 'ai-response',
    },
    {
      eventId: 2,
      requestId: 'request-2',
      type: 'ai-response',
    },
  ]

  const result = getResponseMap(events)

  expect(result).toEqual({
    'request-1': events[0],
    'request-2': events[1],
  })
})

test('getResponseMap should ignore events that are not ai responses with string request ids', () => {
  const responseEvent = {
    eventId: 4,
    requestId: 'request-2',
    type: 'ai-response',
  }
  const events = [
    {
      eventId: 1,
      requestId: 'request-1',
      type: 'ai-request',
    },
    {
      eventId: 2,
      requestId: 2,
      type: 'ai-response',
    },
    {
      eventId: 3,
      type: 'ai-response',
    },
    responseEvent,
  ]

  const result = getResponseMap(events)

  expect(result).toEqual({
    'request-2': responseEvent,
  })
})
