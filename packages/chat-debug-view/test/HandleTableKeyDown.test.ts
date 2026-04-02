import { afterEach, expect, jest, test } from '@jest/globals'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import { handleTableKeyDown } from '../src/parts/HandleTableKeyDown/HandleTableKeyDown.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('handleTableKeyDown should focus the next row for ArrowDown', async () => {
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
})

test('handleTableKeyDown should focus the previous row for ArrowUp', async () => {
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
})

test('handleTableKeyDown should focus the first row for Home', async () => {
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
})

test('handleTableKeyDown should focus the last row for End', async () => {
  const loadSelectedEvent = jest.fn().mockResolvedValue({
    detail: 'value',
    eventId: 2,
    type: 'response',
  } as ChatViewEvent)
  const { focusLastDependencies } = await import('../src/parts/FocusLast/FocusLast.ts')
  jest.spyOn(focusLastDependencies, 'loadSelectedEvent').mockImplementation(loadSelectedEvent)
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
  expect(loadSelectedEvent).toHaveBeenCalledWith('lvce-chat-view-sessions', 2, 'chat-view-events', 'session-1', 'sessionId', 2, 'response')
})

test('handleTableKeyDown should ignore unrelated keys', async () => {
  const state = {
    ...createDefaultState(),
    selectedEventIndex: 1,
  }

  const result = await handleTableKeyDown(state, 'Tab')

  expect(result).toBe(state)
})
