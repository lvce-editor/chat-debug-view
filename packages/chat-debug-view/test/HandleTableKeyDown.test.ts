import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import { handleTableKeyDown } from '../src/parts/HandleTableKeyDown/HandleTableKeyDown.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTableKeyDown should focus the next row for ArrowDown', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => ({
      detail: 'value',
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

  const result = await handleTableKeyDown(state, 'ArrowDown')

  expect(result.selectedEventIndex).toBe(1)
  expect(result.selectedDetailTab).toBe('preview')
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 2, 'response']])
})

test('handleTableKeyDown should focus the previous row for ArrowUp', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => ({
      detail: 'value',
      eventId: 1,
      type: 'request',
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

  const result = await handleTableKeyDown(state, 'ArrowUp')

  expect(result.selectedEventIndex).toBe(0)
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 1, 'request']])
})

test('handleTableKeyDown should focus the first row for Home', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => ({
      detail: 'value',
      eventId: 1,
      type: 'request',
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

  const result = await handleTableKeyDown(state, 'Home')

  expect(result.selectedEventIndex).toBe(0)
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 1, 'request']])
})

test('handleTableKeyDown should focus the last row for End', async () => {
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => ({
      detail: 'value',
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
    sessionId: 'session-1',
  }

  const result = await handleTableKeyDown(state, 'End')

  expect(result.selectedEventIndex).toBe(1)
  expect(result.selectedEvent).toEqual({
    detail: 'value',
    eventId: 2,
    type: 'response',
  })
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 2, 'response']])
})

test('handleTableKeyDown should ignore unrelated keys', async () => {
  const state = {
    ...createDefaultState(),
    selectedEventIndex: 1,
  }

  const result = await handleTableKeyDown(state, 'Tab')

  expect(result).toBe(state)
})
