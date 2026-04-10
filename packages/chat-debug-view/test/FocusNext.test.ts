import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import * as DetailTab from '../src/parts/DetailTab/DetailTab.ts'
import { focusNext } from '../src/parts/FocusNext/FocusNext.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('focusNext should select the first row when nothing is selected', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => ({
      detail: 'row-1',
      eventId: 1,
      type: 'request',
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
    sessionId: 'session-1',
  }

  const result = await focusNext(state)

  expect(result.selectedEventIndex).toBe(0)
  expect(DetailTab.getSelectedDetailTab(result.detailTabs)).toBe('preview')
  expect(result.selectedEvent).toEqual({
    detail: 'row-1',
    eventId: 1,
    type: 'request',
  })
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 1, 'request']])
})

test('focusNext should stop at the last row', async () => {
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
    selectedEventIndex: 1,
    sessionId: 'session-1',
  }

  const result = await focusNext(state)

  expect(result.selectedEventIndex).toBe(1)
  expect(mockRpc.invocations).toEqual([])
})
