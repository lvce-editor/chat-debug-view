import { expect, test } from '@jest/globals'
import * as HandleInput from '../src/parts/HandleInput/HandleInput.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleInput should update filter value', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.Filter, 'error', false)
  expect(result.filterValue).toBe('error')
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

test('handleInput should preserve selected merged tool event when filter still includes it', () => {
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
        output: {
          contents: 'hello',
        },
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:01.000Z',
        toolName: 'read_file',
        type: 'tool-execution-finished',
      },
      {
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

test('handleInput should keep state for non-filter input names', () => {
  const state = createDefaultState()
  const result = HandleInput.handleInput(state, InputName.EventCategoryFilter, 'tools', false)
  expect(result).toBe(state)
})
