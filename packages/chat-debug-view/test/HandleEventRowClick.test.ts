import { afterEach, expect, jest, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import { handleEventRowClick, handleEventRowClickDependencies } from '../src/parts/HandleEventRowClick/HandleEventRowClick.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('handleEventRowClick should select the clicked event row and load details', async () => {
  const loadSelectedEventSpy = jest.spyOn(handleEventRowClickDependencies, 'loadSelectedEvent').mockResolvedValue({
    detail: 'value',
    eventId: 3,
    type: 'request',
  } as ChatViewEvent)
  const state = {
    ...createDefaultState(),
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
  }
  const result = await handleEventRowClick(state, '2', 0)

  expect(result.selectedEventIndex).toBe(2)
  expect(result.selectedEvent).toEqual({
    detail: 'value',
    eventId: 3,
    type: 'request',
  })
  expect(loadSelectedEventSpy).toHaveBeenCalledWith('lvce-chat-view-sessions', 2, 'chat-view-events', 'session-1', 'sessionId', 3, 'request')
})

test('handleEventRowClick should ignore clicks without a row index', async () => {
  const state = {
    ...createDefaultState(),
    selectedEventIndex: 1,
  }
  const result = await handleEventRowClick(state, '', 0)

  expect(result).toBe(state)
})

test('handleEventRowClick should ignore non-primary button clicks', async () => {
  const state = {
    ...createDefaultState(),
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
  }

  const result = await handleEventRowClick(state, '0', 2)

  expect(result).toBe(state)
})

test('handleEventRowClick should fall back to the in-memory event when it has no eventId', async () => {
  const state = {
    ...createDefaultState(),
    events: [
      {
        path: '/chat',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
    ],
  }

  const result = await handleEventRowClick(state, '0', 0)

  expect(result.selectedEventIndex).toBe(0)
  expect(result.selectedEventId).toBeNull()
  expect(result.selectedEvent).toEqual({
    path: '/chat',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  })
})

test('handleEventRowClick should fall back to the selected list event when loading details returns null', async () => {
  jest.spyOn(handleEventRowClickDependencies, 'loadSelectedEvent').mockResolvedValue(null)
  const state = {
    ...createDefaultState(),
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
  }

  const result = await handleEventRowClick(state, '0', 0)

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
