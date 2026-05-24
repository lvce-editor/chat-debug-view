import { expect, test } from '@jest/globals'
import { ChatStorageWorker } from '@lvce-editor/rpc-registry'
import type { ChatDebugViewState } from '../src/parts/State/ChatDebugViewState.ts'
import { createDetailTabs } from '../src/parts/CreateDetailTabs/CreateDetailTabs.ts'
import { getSelectedDetailTab } from '../src/parts/GetSelectedDetailTab/GetSelectedDetailTab.ts'
import { handleEventRowClickAt } from '../src/parts/HandleEventRowClickAt/HandleEventRowClickAt.ts'
import { hasDetailTab } from '../src/parts/HasDetailTab/HasDetailTab.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import { applyVirtualTableState } from '../src/parts/VirtualTable/VirtualTable.ts'
const tableClientX = 30
const row0ClientY = 180
const row1ClientY = 197
const row2ClientY = 221

const createClickableState = (overrides: Partial<ChatDebugViewState> = {}): ChatDebugViewState => {
  return applyVirtualTableState({
    ...createDefaultState(),
    height: 600,
    tableWidth: 480,
    width: 900,
    x: 10,
    y: 20,
    ...overrides,
  })
}

test('handleEventRowClick should select the clicked event row and load details', async () => {
  const state = createClickableState({
    events: [
      {
        duration: 1,
        endTime: '2026-03-08T00:00:00.000Z',
        eventId: 1,
        startTime: '2026-03-08T00:00:00.000Z',
        subType: 'request',
        type: 'request',
      },
      {
        duration: 1,
        endTime: '2026-03-08T00:00:01.000Z',
        eventId: 2,
        startTime: '2026-03-08T00:00:01.000Z',
        subType: 'response',
        type: 'response',
      },
      {
        duration: 1,
        endTime: '2026-03-08T00:00:02.000Z',
        eventId: 3,
        startTime: '2026-03-08T00:00:02.000Z',
        subType: 'request',
        type: 'request',
      },
    ],
    sessionId: 'session-1',
  })
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => ({
      detail: 'value',
      eventId: 3,
      subType: 'request',
      type: 'request',
    }),
  })

  const result = await handleEventRowClickAt(state, tableClientX, row2ClientY, 0)

  expect(result.selectedEventIndex).toBe(2)
  expect(result.selectedEvent).toEqual({
    detail: 'value',
    duration: 1,
    endTime: '2026-03-08T00:00:02.000Z',
    eventId: 3,
    startTime: '2026-03-08T00:00:02.000Z',
    subType: 'request',
    type: 'request',
  })
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 3, 'request']])
})

test('handleEventRowClick should ignore clicks outside the table body', async () => {
  const state = createClickableState({
    selectedEventIndex: 1,
  })

  const result = await handleEventRowClickAt(state, tableClientX, 171, 0)

  expect(result).toBe(state)
})

test('handleEventRowClick should ignore non-primary button clicks', async () => {
  const state = createClickableState({
    events: [
      {
        duration: 1,
        endTime: '2026-03-08T00:00:00.000Z',
        eventId: 1,
        startTime: '2026-03-08T00:00:00.000Z',
        subType: 'request',
        type: 'request',
      },
    ],
    selectedEventIndex: 1,
  })

  const result = await handleEventRowClickAt(state, tableClientX, row0ClientY, 2)

  expect(result).toBe(state)
})

test('handleEventRowClick should fall back to the in-memory event when it has no eventId', async () => {
  const event = {
    eventId: 1,
    path: '/chat',
    subType: 'request',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }
  const state = createClickableState({
    events: [event],
  })
  Reflect.deleteProperty(event, 'eventId')

  const result = await handleEventRowClickAt(state, tableClientX, row0ClientY, 0)

  expect(result.selectedEventIndex).toBe(0)
  expect(result.selectedEventId).toBeNull()
  expect(result.selectedEvent).toEqual({
    path: '/chat',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  })
})

test('handleEventRowClick should fall back to the selected list event when loading details returns null', async () => {
  const state = createClickableState({
    events: [
      {
        eventId: 1,
        path: '/chat',
        sessionId: 'session-1',
        subType: 'request',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
    ],
    sessionId: 'session-1',
  })
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => null,
  })

  const result = await handleEventRowClickAt(state, tableClientX, row0ClientY, 0)

  expect(result.selectedEventIndex).toBe(0)
  expect(result.selectedEventId).toBe(1)
  expect(result.selectedEvent).toEqual({
    eventId: 1,
    path: '/chat',
    sessionId: 'session-1',
    subType: 'request',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  })
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 1, 'request']])
})

test('handleEventRowClick should preserve selected detail tab when switching rows', async () => {
  const state = createClickableState({
    detailTabs: createDetailTabs('preview'),
    events: [
      {
        eventId: 1,
        subType: 'request',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
        eventId: 2,
        subType: 'response',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'response',
      },
    ],
    sessionId: 'session-1',
  })
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => ({
      detail: 'preview',
      eventId: 2,
      subType: 'response',
      type: 'response',
    }),
  })

  const result = await handleEventRowClickAt(state, tableClientX, row1ClientY, 0)

  expect(getSelectedDetailTab(result.detailTabs)).toBe('preview')
  expect(result.selectedEventIndex).toBe(1)
  expect(result.selectedEvent).toEqual({
    detail: 'preview',
    eventId: 2,
    subType: 'response',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'response',
  })
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 2, 'response']])
})

test('handleEventRowClick should fall back to response and hide timing when the selected event has no timing details', async () => {
  const state = createClickableState({
    detailTabs: createDetailTabs('timing'),
    events: [
      {
        ended: '2026-03-08T00:00:00.250Z',
        eventId: 1,
        started: '2026-03-08T00:00:00.000Z',
        subType: 'request',
        type: 'request',
      },
      {
        eventId: 2,
        subType: 'chat-message-added',
        text: 'hello',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'chat-message-added',
      },
    ],
    sessionId: 'session-1',
  })
  using mockRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.loadSelectedEvent': () => ({
      detail: 'preview',
      eventId: 2,
      subType: 'chat-message-added',
      type: 'chat-message-added',
    }),
  })

  const result = await handleEventRowClickAt(state, tableClientX, row1ClientY, 0)

  expect(getSelectedDetailTab(result.detailTabs)).toBe('response')
  expect(hasDetailTab(result.detailTabs, 'timing')).toBe(false)
  expect(result.selectedEventIndex).toBe(1)
  expect(result.selectedEvent).toEqual({
    detail: 'preview',
    eventId: 2,
    subType: 'chat-message-added',
    text: 'hello',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'chat-message-added',
  })
  expect(mockRpc.invocations).toEqual([['ChatStorage.loadSelectedEvent', 'session-1', 2, 'chat-message-added']])
})
