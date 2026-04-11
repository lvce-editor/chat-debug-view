import { expect, test } from '@jest/globals'
import { getCurrentEvents } from '../src/parts/LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'
import * as HandleTableHeaderClick from '../src/parts/HandleTableHeaderClick/HandleTableHeaderClick.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('handleTableHeaderClick should sort current events ascending and descending when clicking the same column', () => {
  const responseEvent = {
    eventId: 2,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'response',
  }
  const requestEvent = {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }
  const state = {
    ...createDefaultState(),
    events: [responseEvent, requestEvent],
    selectedEvent: responseEvent,
    selectedEventId: 2,
    selectedEventIndex: 0,
  }

  const ascendingState = HandleTableHeaderClick.handleTableHeaderClick(state, TableColumn.Type)
  const descendingState = HandleTableHeaderClick.handleTableHeaderClick(ascendingState, TableColumn.Type)

  expect(getCurrentEvents(ascendingState)).toEqual([requestEvent, responseEvent])
  expect(ascendingState.selectedEventIndex).toBe(1)
  expect(getCurrentEvents(descendingState)).toEqual([responseEvent, requestEvent])
  expect(descendingState.selectedEventIndex).toBe(0)
})

test('handleTableHeaderClick should ignore unknown columns', () => {
  const state = createDefaultState()

  const result = HandleTableHeaderClick.handleTableHeaderClick(state, 'unknown')

  expect(result).toBe(state)
})