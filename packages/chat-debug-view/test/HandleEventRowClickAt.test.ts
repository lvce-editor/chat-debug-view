import { afterEach, expect, jest, test } from '@jest/globals'
import type * as LoadSelectedEvent from '../src/parts/LoadSelectedEvent/LoadSelectedEvent.ts'
import type { ChatDebugViewState } from '../src/parts/State/ChatDebugViewState.ts'
import { createDetailTabs } from '../src/parts/CreateDetailTabs/CreateDetailTabs.ts'
import { getSelectedDetailTab } from '../src/parts/GetSelectedDetailTab/GetSelectedDetailTab.ts'
import { handleEventRowClickAt } from '../src/parts/HandleEventRowClickAt/HandleEventRowClickAt.ts'
import { hasDetailTab } from '../src/parts/HasDetailTab/HasDetailTab.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import { applyVirtualTableState } from '../src/parts/VirtualTable/VirtualTable.ts'

type LoadSelectedEventFn = (...args: readonly unknown[]) => ReturnType<typeof LoadSelectedEvent.loadSelectedEvent>

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

afterEach(() => {
  jest.restoreAllMocks()
})

test('handleEventRowClick should select the clicked event row and load details', async () => {
  const loadSelectedEvent = jest.fn<LoadSelectedEventFn>().mockResolvedValue({
    detail: 'value',
    eventId: 3,
    type: 'request',
  })
  const state = createClickableState({
    events: [
      {
        duration: 1,
        endTime: '2026-03-08T00:00:00.000Z',
        eventId: 1,
        startTime: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
        duration: 1,
        endTime: '2026-03-08T00:00:01.000Z',
        eventId: 2,
        startTime: '2026-03-08T00:00:01.000Z',
        type: 'response',
      },
      {
        duration: 1,
        endTime: '2026-03-08T00:00:02.000Z',
        eventId: 3,
        startTime: '2026-03-08T00:00:02.000Z',
        type: 'request',
      },
    ],
    sessionId: 'session-1',
  })
  const result = await handleEventRowClickAt(state, tableClientX, row2ClientY, 0, loadSelectedEvent)

  expect(result.selectedEventIndex).toBe(2)
  expect(result.selectedEvent).toEqual({
    detail: 'value',
    duration: 1,
    endTime: '2026-03-08T00:00:02.000Z',
    eventId: 3,
    startTime: '2026-03-08T00:00:02.000Z',
    type: 'request',
  })
  expect(loadSelectedEvent).toHaveBeenCalledWith('lvce-chat-view-sessions', 2, 'chat-view-events', 'session-1', 'sessionId', 3, 'request', 0)
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
  const loadSelectedEvent = jest.fn<LoadSelectedEventFn>().mockResolvedValue(null)
  const state = createClickableState({
    events: [
      {
        eventId: 1,
        path: '/chat',
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
    ],
    sessionId: 'session-1',
  })

  const result = await handleEventRowClickAt(state, tableClientX, row0ClientY, 0, loadSelectedEvent)

  expect(result.selectedEventIndex).toBe(0)
  expect(result.selectedEventId).toBe(1)
  expect(result.selectedEvent).toEqual({
    eventId: 1,
    path: '/chat',
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  })
})

test('handleEventRowClick should preserve selected detail tab when switching rows', async () => {
  const loadSelectedEvent = jest.fn<LoadSelectedEventFn>().mockResolvedValue({
    detail: 'preview',
    eventId: 2,
    type: 'response',
  })
  const state = createClickableState({
    detailTabs: createDetailTabs('preview'),
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
  })

  const result = await handleEventRowClickAt(state, tableClientX, row1ClientY, 0, loadSelectedEvent)

  expect(getSelectedDetailTab(result.detailTabs)).toBe('preview')
  expect(result.selectedEventIndex).toBe(1)
  expect(result.selectedEvent).toEqual({
    detail: 'preview',
    eventId: 2,
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'response',
  })
})

test('handleEventRowClick should fall back to response and hide timing when the selected event has no timing details', async () => {
  const loadSelectedEvent = jest.fn<LoadSelectedEventFn>().mockResolvedValue({
    detail: 'preview',
    eventId: 2,
    type: 'chat-message-added',
  })
  const state = createClickableState({
    detailTabs: createDetailTabs('timing'),
    events: [
      {
        ended: '2026-03-08T00:00:00.250Z',
        eventId: 1,
        started: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
        eventId: 2,
        text: 'hello',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'chat-message-added',
      },
    ],
    sessionId: 'session-1',
  })

  const result = await handleEventRowClickAt(state, tableClientX, row1ClientY, 0, loadSelectedEvent)

  expect(getSelectedDetailTab(result.detailTabs)).toBe('response')
  expect(hasDetailTab(result.detailTabs, 'timing')).toBe(false)
  expect(result.selectedEventIndex).toBe(1)
  expect(result.selectedEvent).toEqual({
    detail: 'preview',
    eventId: 2,
    text: 'hello',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'chat-message-added',
  })
})
