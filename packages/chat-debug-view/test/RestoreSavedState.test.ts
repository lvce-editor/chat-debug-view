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

test('restoreSavedState should restore table column widths', () => {
  const state = createDefaultState()

  const result = restoreSavedState(state, {
    tableColumnWidths: {
      duration: 80,
      status: 140,
      type: 260,
    },
  })

  expect(result.tableColumnWidths).toEqual({
    duration: 80,
    status: 140,
    type: 260,
  })
})

test('restoreSavedState should ignore invalid table column widths', () => {
  const state = createDefaultState()

  const result = restoreSavedState(state, {
    tableColumnWidths: {
      duration: 'wide',
      status: 140,
      type: 260,
    },
  })

  expect(result.tableColumnWidths).toEqual(state.tableColumnWidths)
})
