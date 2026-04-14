import { expect, test } from '@jest/globals'
import type { ChatDebugViewState } from '../src/parts/State/ChatDebugViewState.ts'
import { getTableBodyEventIndex } from '../src/parts/GetTableBodyEventIndex/GetTableBodyEventIndex.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

const createState = (): ChatDebugViewState => {
  return {
    ...createDefaultState(),
    events: [
      { eventId: 1, type: 'request' },
      { eventId: 2, type: 'response' },
      { eventId: 3, type: 'request' },
    ],
    height: 600,
    tableMaxLineY: 3,
    tableWidth: 480,
    width: 900,
    x: 10,
    y: 20,
  }
}

test('getTableBodyEventIndex should derive event index from coordinates', () => {
  const state = createState()

  const result = getTableBodyEventIndex(state, 30, 197)

  expect(result).toBe(1)
})

test('getTableBodyEventIndex should return -1 when devtools layout is disabled', () => {
  const state = {
    ...createState(),
    useDevtoolsLayout: false,
  }

  const result = getTableBodyEventIndex(state, 30, 197)

  expect(result).toBe(-1)
})

test('getTableBodyEventIndex should return -1 when pointer is outside table width', () => {
  const state = createState()

  const result = getTableBodyEventIndex(state, 500, 197)

  expect(result).toBe(-1)
})

test('getTableBodyEventIndex should return -1 when pointer is above table body', () => {
  const state = createState()

  const result = getTableBodyEventIndex(state, 30, 171)

  expect(result).toBe(-1)
})

test('getTableBodyEventIndex should return -1 when pointer is past the last row', () => {
  const state = createState()

  const result = getTableBodyEventIndex(state, 30, 246)

  expect(result).toBe(-1)
})

test('getTableBodyEventIndex should add the virtual list offset to the clicked row', () => {
  const state = {
    ...createState(),
    events: [
      { eventId: 1, type: 'request' },
      { eventId: 2, type: 'response' },
      { eventId: 3, type: 'request' },
      { eventId: 4, type: 'response' },
      { eventId: 5, type: 'request' },
      { eventId: 6, type: 'response' },
      { eventId: 7, type: 'request' },
      { eventId: 8, type: 'response' },
    ],
    tableMaxLineY: 8,
    tableMinLineY: 5,
  }

  const result = getTableBodyEventIndex(state, 30, 173)

  expect(result).toBe(5)
})
