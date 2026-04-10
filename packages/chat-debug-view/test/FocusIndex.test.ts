import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import * as DetailTab from '../src/parts/DetailTab/DetailTab.ts'
import { focusIndex } from '../src/parts/FocusIndex/FocusIndex.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('focusIndex should keep the same state when there are no visible events', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => ({
      detail: 'unused',
      eventId: 1,
      type: 'request',
    }),
  })
  const state = createDefaultState()

  const result = await focusIndex(state, 0)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('focusIndex should select the requested visible event', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => ({
      detail: 'row-2',
      eventId: 2,
      type: 'response',
    }),
  })
  const state = {
    ...createDefaultState(),
    detailTabs: DetailTab.createDetailTabs('preview'),
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
    selectedEventIndex: 0,
    sessionId: 'session-1',
  }

  const result = await focusIndex(state, 1)

  expect(result.selectedEventIndex).toBe(1)
  expect(DetailTab.getSelectedDetailTab(result.detailTabs)).toBe('preview')
  expect(result.selectedEvent).toEqual({
    detail: 'row-2',
    eventId: 2,
    type: 'response',
  })
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 2, 'response']])
})
