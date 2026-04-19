import { expect, test } from '@jest/globals'
import { getResponseEvent } from '../src/parts/GetResponseEvent/GetResponseEvent.ts'

test('getResponseEvent should return responseEvent for merged ai request/response events', () => {
  const responseEvent = {
    eventId: 2,
    requestId: 'request-1',
    type: 'ai-response-success',
    value: {
      id: 'resp_1',
    },
  }
  const event = {
    eventId: 1,
    requestEvent: {
      eventId: 1,
      requestId: 'request-1',
      type: 'ai-request',
    },
    responseEvent,
    type: 'ai-request',
  }

  expect(getResponseEvent(event)).toEqual(responseEvent)
})
