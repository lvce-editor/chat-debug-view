import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import { selectEventAtIndex } from '../src/parts/SelectEventAtIndex/SelectEventAtIndex.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('selectEventAtIndex should clear the selected event when the index is out of range', async () => {
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        subType: 'request',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
    ],
  }

  const result = await selectEventAtIndex(state, 3)

  expect(result).toEqual({
    ...state,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: 3,
  })
})

test('selectEventAtIndex should keep the event selected when it has no numeric event id', async () => {
  const invalidEvent = {
    eventId: 'missing-id',
    subType: 'request',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  } as unknown as ChatViewEvent
  const state = {
    ...createDefaultState(),
    events: [invalidEvent],
  }

  const result = await selectEventAtIndex(state, 0)

  expect(result).toEqual({
    ...state,
    selectedEvent: invalidEvent,
    selectedEventId: null,
    selectedEventIndex: 0,
  })
})

test('selectEventAtIndex should preserve merged ai request and response details', async () => {
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
    sessionId: 'session-1',
  }
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => ({
      body: {
        input: ['1+1'],
      },
      eventId: 1,
      requestId: 'request-1',
      subType: 'ai-request',
      type: 'ai-request',
    }),
  })

  const result = await selectEventAtIndex(state, 0)

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
