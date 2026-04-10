import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import { focusLast } from '../src/parts/FocusLast/FocusLast.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('focusLast should keep the same state when there are no visible events', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => ({
      detail: 'unused',
      eventId: 1,
      type: 'request',
    }),
  })
  const state = createDefaultState()

  const result = await focusLast(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('focusLast should select the final event when another row is selected', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => ({
      detail: 'row-2',
      eventId: 2,
      type: 'response',
    }),
  })
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
        eventId: 2,
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'response',
      },
    ],
    selectedDetailTab: 'preview',
    selectedEventIndex: 0,
    sessionId: 'session-1',
  }

  const result = await focusLast(state)

  expect(result.selectedEventIndex).toBe(1)
  expect(result.selectedDetailTab).toBe('preview')
  expect(result.selectedEvent).toEqual({
    detail: 'row-2',
    eventId: 2,
    type: 'response',
  })
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 2, 'response']])
})
