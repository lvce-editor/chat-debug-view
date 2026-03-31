import { expect, test } from '@jest/globals'
import * as Diff from '../src/parts/Diff/Diff.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
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

test('diff should return RenderIncremental and RenderCss when showResponsePartEvents changes', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    showResponsePartEvents: true,
  }
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([DiffType.RenderIncremental, DiffType.RenderCss])
})

test('diff should return RenderIncremental and RenderCss when showEventStreamFinishedEvents changes', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    showEventStreamFinishedEvents: true,
  }
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([DiffType.RenderIncremental, DiffType.RenderCss])
})

test('diff should return RenderIncremental and RenderCss when useDevtoolsLayout changes', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    useDevtoolsLayout: true,
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

test('diff should return empty array when no observed properties change', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
  }
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([])
})
