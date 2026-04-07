import { expect, test } from '@jest/globals'
import * as HandleCloseDetails from '../src/parts/HandleCloseDetails/HandleCloseDetails.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleCloseDetails should close details panel', () => {
  const state = {
    ...createDefaultState(),
    selectedEventIndex: 1,
  }
  const result = HandleCloseDetails.handleCloseDetails(state)
  expect(result.selectedEventIndex).toBeNull()
})
