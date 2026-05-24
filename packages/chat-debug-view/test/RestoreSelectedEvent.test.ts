import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import { restoreSelectedEvent } from '../src/parts/LoadEvents/RestoreSelectedEvent/RestoreSelectedEvent.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('restoreSelectedEvent should load details for the selected visible event', async () => {
  const requestEvent = {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    subType: 'request',
    type: 'request',
  }
  const responseEvent = {
    eventId: 2,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:01.000Z',
    subType: 'response',
    type: 'response',
  }
  const selectedEvent = {
    detail: 'restored',
    eventId: 2,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:01.000Z',
    subType: 'response',
    type: 'response',
  }
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => selectedEvent,
  })
  const state = {
    ...createDefaultState(),
    events: [requestEvent, responseEvent],
    selectedEventId: 2,
    sessionId: 'session-1',
  }

  const result = await restoreSelectedEvent(state)

  expect(result).toEqual({
    ...state,
    selectedEvent,
    selectedEventId: 2,
    selectedEventIndex: 1,
  })
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 2, 'response']])
})

test('restoreSelectedEvent should clear selection when the selected event is no longer visible', async () => {
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        subType: 'request',
        type: 'request',
      },
      {
        eventId: 2,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        subType: 'response',
        type: 'response',
      },
    ],
    filterValue: 'request',
    selectedEvent: { eventId: 2, subType: 'response', type: 'response' },
    selectedEventId: 2,
    selectedEventIndex: 1,
    sessionId: 'session-1',
  }

  const result = await restoreSelectedEvent(state)

  expect(result).toEqual({
    ...state,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
  })
})

test('restoreSelectedEvent should preserve merged ai request and response details', async () => {
  const selectedEventDetails = {
    body: {
      input: ['1+1'],
    },
    eventId: 1,
    requestId: 'request-1',
    subType: 'ai-request',
    type: 'ai-request',
  }
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => selectedEventDetails,
  })
  const mergedEvent = {
    ended: '2026-04-19T12:00:00.250Z',
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
      value: {
        id: 'resp_1',
      },
    },
    sessionId: 'session-1',
    started: '2026-04-19T12:00:00.000Z',
    subType: 'ai-request',
    type: 'ai-request',
  }
  const state = {
    ...createDefaultState(),
    events: [mergedEvent],
    selectedEventId: 1,
    sessionId: 'session-1',
  }

  const result = await restoreSelectedEvent(state)

  expect(result.selectedEvent).toEqual(
    expect.objectContaining({
      requestEvent: {
        body: {
          input: ['1+1'],
        },
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
        value: {
          id: 'resp_1',
        },
      },
    }),
  )
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 1, 'ai-request']])
})
