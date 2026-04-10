import { expect, test } from '@jest/globals'
import { MenuItemFlags } from '@lvce-editor/constants'
import * as GetColumnVisibilityFlags from '../src/parts/GetColumnVisibilityFlags/GetColumnVisibilityFlags.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('getColumnVisibilityFlags should return checked for visible column', () => {
  const state = createDefaultState()

  const result = GetColumnVisibilityFlags.getColumnVisibilityFlags(state, TableColumn.Type)

  expect(result).toBe(MenuItemFlags.Checked)
})

test('getColumnVisibilityFlags should return unchecked for hidden column', () => {
  const state = {
    ...createDefaultState(),
    visibleTableColumns: [TableColumn.Type, TableColumn.Status],
  }

  const result = GetColumnVisibilityFlags.getColumnVisibilityFlags(state, TableColumn.Duration)

  expect(result).toBe(MenuItemFlags.Unchecked)
})
