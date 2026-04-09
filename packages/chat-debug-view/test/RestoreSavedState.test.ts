import { expect, test } from '@jest/globals'
import { restoreSavedState } from '../src/parts/RestoreSavedState/RestoreSavedState.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('restoreSavedState should restore visible table columns', () => {
  const state = createDefaultState()

  const result = restoreSavedState(state, {
    visibleTableColumns: ['status', 'type'],
  })

  expect(result.visibleTableColumns).toEqual(['type', 'status'])
})

test('restoreSavedState should ignore invalid visible table columns', () => {
  const state = createDefaultState()

  const result = restoreSavedState(state, {
    visibleTableColumns: ['type', 'unknown'],
  })

  expect(result.visibleTableColumns).toEqual(['type'])
})
