import { expect, test } from '@jest/globals'
import * as HandleEventRowClick from '../src/parts/HandleEventRowClick/HandleEventRowClick.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleEventRowClick should select the clicked event row', () => {
  const state = createDefaultState()
  const result = HandleEventRowClick.handleEventRowClick(state, '2')

  expect(result.selectedEventIndex).toBe(2)
})

test('handleEventRowClick should ignore clicks without a row index', () => {
  const state = {
    ...createDefaultState(),
    selectedEventIndex: 1,
  }
  const result = HandleEventRowClick.handleEventRowClick(state, '')

  expect(result).toBe(state)
})