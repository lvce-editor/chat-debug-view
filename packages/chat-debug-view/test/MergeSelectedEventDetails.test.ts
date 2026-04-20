import { expect, test } from '@jest/globals'
import { mergeSelectedEventDetails } from '../src/parts/MergeSelectedEventDetails/MergeSelectedEventDetails.ts'

test('mergeSelectedEventDetails should prefer the loaded response event for ai response details', () => {
  const selectedEvent = {
    eventId: 1,
    requestEvent: {
      eventId: 1,
      requestId: 'request-1',
      type: 'ai-request',
    },
    responseEvent: {
      eventId: 2,
      requestId: 'request-1',
      type: 'ai-response',
    },
    type: 'ai-request',
  }
  const selectedEventDetails = {
    eventId: 2,
    requestId: 'request-1',
    type: 'ai-response',
    value: {
      id: 'resp_1',
    },
  }

  const result = mergeSelectedEventDetails(selectedEvent as never, selectedEventDetails as never)

  expect(result.responseEvent).toEqual(selectedEventDetails)
})
