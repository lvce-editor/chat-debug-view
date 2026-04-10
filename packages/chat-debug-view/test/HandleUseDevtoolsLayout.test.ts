import { expect, test } from '@jest/globals'
import * as HandleUseDevtoolsLayout from '../src/parts/HandleUseDevtoolsLayout/HandleUseDevtoolsLayout.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleUseDevtoolsLayout should preserve selected event when enabling layout', () => {
  const selectedEvent = {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }
  const state = {
    ...createDefaultState(),
    events: [selectedEvent],
    selectedEvent,
    selectedEventId: 1,
    selectedEventIndex: 0,
    useDevtoolsLayout: false,
  }

  const result = HandleUseDevtoolsLayout.setUseDevtoolsLayout(state, true)

  expect(result.useDevtoolsLayout).toBe(true)
  expect(result.selectedEventIndex).toBe(0)
  expect(result.selectedEventId).toBe(1)
})
