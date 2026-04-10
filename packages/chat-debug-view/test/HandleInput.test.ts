import { expect, test } from '@jest/globals'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import * as HandleInput from '../src/parts/HandleInput/HandleInput.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleInput should update filter value', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.Filter, 'error', false)
  expect(result.filterValue).toBe('error')
})

test('handleInput should update event category filter', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.EventCategoryFilter, EventCategoryFilter.Tools, 'on')
  expect(result.eventCategoryFilter).toBe(EventCategoryFilter.Tools)
})

test('handleInput should set selectedEventIndex when selecting row', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.SelectedEventIndex, '2', false)
  expect(result.selectedEventIndex).toBe(2)
})

test('handleInput should update timeline start seconds', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.TimelineStartSeconds, '5', false)
  expect(result.timelineStartSeconds).toBe('5')
})

test('handleInput should update timeline end seconds', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.TimelineEndSeconds, '7', false)
  expect(result.timelineEndSeconds).toBe('7')
})

test('handleInput should clear timeline range', () => {
  const state = {
    ...createDefaultState(),
    timelineEndSeconds: '7',
    timelineStartSeconds: '5',
  }
  const result = HandleInput.handleInput(state, InputName.TimelineRangePreset, '', false)
  expect(result.timelineStartSeconds).toBe('')
  expect(result.timelineEndSeconds).toBe('')
})

test('handleInput should set timeline range from preset', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.TimelineRangePreset, '5:7', false)
  expect(result.timelineStartSeconds).toBe('5')
  expect(result.timelineEndSeconds).toBe('7')
})

test('handleInput should close details panel', () => {
  const state = {
    ...createDefaultState(),
    selectedEventIndex: 1,
  }
  const result = HandleInput.handleInput(state, InputName.CloseDetails, '', false)
  expect(result.selectedEventIndex).toBeNull()
})

test('handleInput should update selected detail tab', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.DetailTab, 'preview', false)
  expect(result.selectedDetailTab).toBe('preview')
})

test('handleInput should ignore invalid selected detail tab values', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.DetailTab, 'headers', false)
  expect(result).toBe(state)
})

test('handleInput should preserve selected event when filter still includes it', () => {
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
        eventId: 2,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'response',
      },
    ],
    selectedEventIndex: 1,
  }
  const result = HandleInput.handleInput(state, InputName.Filter, 'response', false)
  expect(result.selectedEventIndex).toBe(0)
})

test('handleInput should preserve selected merged tool event when filter still includes it', () => {
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
        eventId: 1,
        output: {
          contents: 'hello',
        },
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        toolName: 'read_file',
        type: 'tool-execution-finished',
      },
      {
        eventId: 2,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:02.000Z',
        type: 'response',
      },
    ],
    selectedEventIndex: 0,
  }

  const result = HandleInput.handleInput(state, InputName.Filter, 'hello', false)
  expect(result.selectedEventIndex).toBe(0)
})

test('handleInput should preserve selected event when category filter still includes it', () => {
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
  const result = HandleInput.handleInput(state, InputName.EventCategoryFilter, EventCategoryFilter.Tools, 'on')
  expect(result.selectedEventIndex).toBe(0)
})

test('handleInput should clear selected event when filter hides it', () => {
  const state = {
    ...createDefaultState(),
    events: [
      {
        eventId: 1,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
        eventId: 2,
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'response',
      },
    ],
    selectedEventIndex: 1,
  }
  const result = HandleInput.handleInput(state, InputName.Filter, 'request', false)
  expect(result.selectedEventIndex).toBeNull()
})

test('handleInput should keep state for unknown input name', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, 'unknown', 'value', false)
  expect(result).toBe(state)
})
