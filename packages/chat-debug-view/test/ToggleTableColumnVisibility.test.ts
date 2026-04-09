import { expect, test } from '@jest/globals'
import { resetTableColumns } from '../src/parts/ResetTableColumns/ResetTableColumns.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import { toggleTableColumnVisibility } from '../src/parts/ToggleTableColumnVisibility/ToggleTableColumnVisibility.ts'

test('toggleTableColumnVisibility should hide a visible column', () => {
  const state = createDefaultState()

  const result = toggleTableColumnVisibility(state, 'duration')

  expect(result.visibleTableColumns).toEqual(['type', 'status'])
})

test('toggleTableColumnVisibility should restore original ordering when re-enabling a column', () => {
  const state = {
    ...createDefaultState(),
    visibleTableColumns: ['type', 'status'],
  }

  const result = toggleTableColumnVisibility(state, 'duration')

  expect(result.visibleTableColumns).toEqual(['type', 'duration', 'status'])
})

test('resetTableColumns should restore default columns', () => {
  const state = {
    ...createDefaultState(),
    visibleTableColumns: ['type'],
  }

  const result = resetTableColumns(state)

  expect(result.visibleTableColumns).toEqual(['type', 'duration', 'status'])
})
