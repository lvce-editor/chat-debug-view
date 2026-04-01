import { expect, jest, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

const mockLoadSelectedEvent = jest.fn()

jest.unstable_mockModule('../src/parts/LoadSelectedEvent/LoadSelectedEvent.ts', () => {
  return {
    loadSelectedEvent: mockLoadSelectedEvent,
  }
})

const HandleEventRowClick = await import('../src/parts/HandleEventRowClick/HandleEventRowClick.ts')

test('handleEventRowClick should select the clicked event row and load details', async () => {
  mockLoadSelectedEvent.mockResolvedValue({
    detail: 'value',
    eventId: 3,
    type: 'request',
  })
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
  const result = await HandleEventRowClick.handleEventRowClick(state, '2')

  expect(result.selectedEventIndex).toBe(2)
  expect(result.selectedEvent).toEqual({
    detail: 'value',
    eventId: 3,
    type: 'request',
  })
  expect(mockLoadSelectedEvent).toHaveBeenCalledWith('lvce-chat-view-sessions', 2, 'chat-view-events', 'session-1', 'sessionId', 3, 'request')
})

test('handleEventRowClick should ignore clicks without a row index', async () => {
  const state = {
    ...createDefaultState(),
    selectedEventIndex: 1,
  }
  const result = await HandleEventRowClick.handleEventRowClick(state, '')

  expect(result).toBe(state)
})
