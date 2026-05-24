import { expect, test } from '@jest/globals'
import { mergeSelectedEventDetails } from '../src/parts/MergeSelectedEventDetails/MergeSelectedEventDetails.ts'

test('mergeSelectedEventDetails should prefer the loaded response event for ai response details', () => {
  const selectedEvent = {
    eventId: 1,
    requestEvent: {
      eventId: 1,
      requestId: 'request-1',
      subType: 'ai-request',
      type: 'ai-request',
    },
    responseEvent: {
      eventId: 2,
      requestId: 'request-1',
      subType: 'ai-response-success',
      type: 'ai-response-success',
    },
    subType: 'ai-request',
    type: 'ai-request',
  }
  const selectedEventDetails = {
    eventId: 2,
    requestId: 'request-1',
    subType: 'ai-response-success',
    type: 'ai-response-success',
    value: {
      id: 'resp_1',
    },
  }

  const result = mergeSelectedEventDetails(selectedEvent, selectedEventDetails)

  expect(result.responseEvent).toEqual(selectedEventDetails)
})

test('mergeSelectedEventDetails should preserve selected event fields when loaded details are partial', () => {
  const selectedEvent = {
    eventId: 1,
    headers: {
      Authorization: 'Bearer [redacted]',
    },
    subType: 'ai-request',
    type: 'ai-request',
  }
  const selectedEventDetails = {
    body: {
      model: 'test',
    },
    eventId: 1,
    subType: 'ai-request',
    type: 'ai-request',
  }

  const result = mergeSelectedEventDetails(selectedEvent, selectedEventDetails)

  expect(result).toEqual({
    body: {
      model: 'test',
    },
    eventId: 1,
    headers: {
      Authorization: 'Bearer [redacted]',
    },
    subType: 'ai-request',
    type: 'ai-request',
  })
})
