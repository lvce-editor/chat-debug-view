import { expect, test } from '@jest/globals'
import { getResponseData, getResponseEvent } from '../src/parts/GetResponseEvent/GetResponseEvent.ts'

test('getResponseData should return undefined when an event has no response payload', () => {
  const event = {
    eventId: 1,
    type: 'request',
  }

  expect(getResponseData(event)).toBeUndefined()
})

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

  expect(getResponseEvent(event)).toEqual({
    id: 'resp_1',
  })
})

test('getResponseData should return endValue value for completed response events', () => {
  const event = {
    endValue: {
      value: {
        id: 'resp_2',
      },
    },
    eventId: 1,
    type: 'ai-request',
  }

  expect(getResponseData(event)).toEqual({
    id: 'resp_2',
  })
})

test('getResponseEvent should fall back to the original event when response payload is missing', () => {
  const event = {
    eventId: 1,
    type: 'request',
  }

  expect(getResponseEvent(event)).toBe(event)
})
