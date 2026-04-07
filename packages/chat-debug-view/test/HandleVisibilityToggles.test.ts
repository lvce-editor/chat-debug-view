import { expect, test } from '@jest/globals'
import * as HandleVisibilityToggles from '../src/parts/HandleVisibilityToggles/HandleVisibilityToggles.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleShowInputEvents should update showInputEvents', () => {
  const state = createDefaultState()
  const result = HandleVisibilityToggles.handleShowInputEvents(state, true)
  expect(result.showInputEvents).toBe(true)
})

test('handleShowResponsePartEvents should update showResponsePartEvents', () => {
  const state = createDefaultState()
  const result = HandleVisibilityToggles.handleShowResponsePartEvents(state, true)
  expect(result.showResponsePartEvents).toBe(true)
})

test('handleShowEventStreamFinishedEvents should update showEventStreamFinishedEvents', () => {
  const state = createDefaultState()
  const result = HandleVisibilityToggles.handleShowEventStreamFinishedEvents(state, true)
  expect(result.showEventStreamFinishedEvents).toBe(true)
})
