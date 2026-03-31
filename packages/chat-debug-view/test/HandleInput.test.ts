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

test('handleInput should set showInputEvents to true for on value', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.ShowInputEvents, '', 'on')
  expect(result.showInputEvents).toBe(true)
})

test('handleInput should set showEventStreamFinishedEvents to true for on value', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.ShowEventStreamFinishedEvents, '', 'on')
  expect(result.showEventStreamFinishedEvents).toBe(true)
})

test('handleInput should set showEventStreamFinishedEvents to false for unchecked value', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.ShowEventStreamFinishedEvents, '', false)
  expect(result.showEventStreamFinishedEvents).toBe(false)
})

test('handleInput should set showInputEvents to false for unchecked value', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.ShowInputEvents, '', false)
  expect(result.showInputEvents).toBe(false)
})

test('handleInput should set showResponsePartEvents to true for on value', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.ShowResponsePartEvents, '', 'on')
  expect(result.showResponsePartEvents).toBe(true)
})

test('handleInput should set showResponsePartEvents to false for unchecked value', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.ShowResponsePartEvents, '', false)
  expect(result.showResponsePartEvents).toBe(false)
})

test('handleInput should set useDevtoolsLayout to true for on value', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.UseDevtoolsLayout, '', 'on')
  expect(result.useDevtoolsLayout).toBe(true)
})

test('handleInput should set useDevtoolsLayout to false for unchecked value', () => {
  const state = {
    ...createDefaultState(),
    useDevtoolsLayout: true,
  }
  const result = HandleInput.handleInput(state, InputName.UseDevtoolsLayout, '', false)
  expect(result.useDevtoolsLayout).toBe(false)
})

test('handleInput should set selectedEventIndex when selecting row', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.SelectedEventIndex, '2', false)
  expect(result.selectedEventIndex).toBe(2)
})

test('handleInput should close details panel', () => {
  const state = {
    ...createDefaultState(),
    selectedEventIndex: 1,
  }
  const result = HandleInput.handleInput(state, InputName.CloseDetails, '', false)
  expect(result.selectedEventIndex).toBeNull()
})

test('handleInput should preserve selected event when filter still includes it', () => {
  const state = {
    ...createDefaultState(),
    events: [
      {
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
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

test('handleInput should preserve selected event when category filter still includes it', () => {
  const state = {
    ...createDefaultState(),
    events: [
      {
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        toolName: 'read_file',
        type: 'tool-execution-started',
      },
      {
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
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
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
