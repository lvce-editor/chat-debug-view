import { expect, test } from '@jest/globals'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import * as HandleEventCategoryFilter from '../src/parts/HandleEventCategoryFilter/HandleEventCategoryFilter.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleEventCategoryFilter should update event category filter', () => {
  const state = createDefaultState()
  const result = HandleEventCategoryFilter.handleEventCategoryFilter(state, EventCategoryFilter.Tools)
  expect(EventCategoryFilter.getSelectedEventCategoryFilter(result.categoryFilters)).toBe(EventCategoryFilter.Tools)
})

test('handleEventCategoryFilter should preserve selected event when category filter still includes it', () => {
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        toolName: 'read_file',
        type: 'tool-execution-started',
      },
      {
        eventId: 2,
        path: '/chat',
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'request',
      },
    ],
    selectedEventIndex: 0,
  }

  const result = HandleEventCategoryFilter.handleEventCategoryFilter(state, EventCategoryFilter.Tools)
  expect(result.selectedEventIndex).toBe(0)
})
