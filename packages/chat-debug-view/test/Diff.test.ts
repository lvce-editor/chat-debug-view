import { expect, test } from '@jest/globals'
import * as Diff from '../src/parts/Diff/Diff.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('diff should return empty array when initial changes only', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    initial: !oldState.initial,
  }
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([])
})

test('diff should return RenderIncremental and RenderCss when filter changes', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    filterValue: 'error',
  }
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([DiffType.RenderIncremental, DiffType.RenderCss])
})

test('diff should return RenderIncremental and RenderCss when event category filter changes', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    categoryFilters: EventCategoryFilter.createCategoryFilters(EventCategoryFilter.Tools),
  }
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([DiffType.RenderIncremental, DiffType.RenderCss])
})

test('diff should return RenderIncremental and RenderCss when selectedEventIndex changes', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    selectedEventIndex: 1,
  }
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([DiffType.RenderIncremental, DiffType.RenderCss])
})

test('diff should return RenderIncremental and RenderCss when selectedEvent changes', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    selectedEvent: {
      eventId: 1,
      type: 'request',
    },
  }
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([DiffType.RenderIncremental, DiffType.RenderCss])
})

test('diff should return RenderIncremental and RenderCss when tableWidth changes', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    tableWidth: 520,
  }
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([DiffType.RenderIncremental, DiffType.RenderCss])
})

test('diff should return RenderIncremental and RenderCss when table column widths change', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    tableColumnWidths: {
      ...oldState.tableColumnWidths,
      type: 280,
    },
  }
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([DiffType.RenderIncremental, DiffType.RenderCss])
})

test('diff should return RenderIncremental and RenderCss when width changes', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    width: 640,
  }
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([DiffType.RenderIncremental, DiffType.RenderCss])
})

test('diff should return RenderIncremental and RenderCss when table sort changes', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    sortColumn: 'type' as const,
  }
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([DiffType.RenderIncremental, DiffType.RenderCss])
})

test('diff should return empty array when no observed properties change', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
  }
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([])
})
