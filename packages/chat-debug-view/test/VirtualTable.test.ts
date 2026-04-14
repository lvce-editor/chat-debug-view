import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import { applyVirtualTableState, withSelectedEventVisible } from '../src/parts/VirtualTable/VirtualTable.ts'

const createEvents = (count: number): readonly { readonly eventId: number; readonly type: string }[] => {
  return Array.from({ length: count }, (_, index) => {
    return {
      eventId: index + 1,
      type: index % 2 === 0 ? 'request' : 'response',
    }
  })
}

test('applyVirtualTableState should clamp the visible row window to the current event list', () => {
  const state = {
    ...createDefaultState(),
    events: createEvents(8),
    height: 200,
    tableDeltaY: 500,
    width: 900,
    x: 10,
    y: 20,
  }

  const result = applyVirtualTableState(state)

  expect(result.tableDeltaY).toBe(176)
  expect(result.tableMinLineY).toBe(7)
  expect(result.tableMaxLineY).toBe(8)
})

test('withSelectedEventVisible should scroll the selected row into the visible window', () => {
  const state = {
    ...createDefaultState(),
    events: createEvents(8),
    height: 200,
    selectedEventIndex: 6,
    width: 900,
    x: 10,
    y: 20,
  }

  const result = withSelectedEventVisible(state)

  expect(result.tableDeltaY).toBe(152)
  expect(result.tableMinLineY).toBe(6)
  expect(result.tableMaxLineY).toBe(7)
})
