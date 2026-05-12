import { expect, test } from '@jest/globals'
import { MenuItemFlags } from '@lvce-editor/constants'
import * as GetColumnVisibilityFlags from '../src/parts/GetColumnVisibilityFlags/GetColumnVisibilityFlags.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('getColumnVisibilityFlags should return checked for visible column', () => {
  const state = createDefaultState()

  const result = GetColumnVisibilityFlags.getColumnVisibilityFlags(state.tableColumns, TableColumn.Type)

  expect(result).toBe(MenuItemFlags.Checked)
})

test('getColumnVisibilityFlags should return unchecked for hidden column', () => {
  const state = {
    ...createDefaultState(),
    tableColumns: TableColumn.getTableColumnsWithVisibility(createDefaultState().tableColumns, [
      TableColumn.Type,
      TableColumn.Method,
      TableColumn.Status,
      TableColumn.Size,
    ]),
  }

  const result = GetColumnVisibilityFlags.getColumnVisibilityFlags(state.tableColumns, TableColumn.Duration)

  expect(result).toBe(MenuItemFlags.Unchecked)
})

test('getColumnVisibilityFlags should return unchecked for a hidden method column', () => {
  const state = {
    ...createDefaultState(),
    tableColumns: TableColumn.getTableColumnsWithVisibility(createDefaultState().tableColumns, [
      TableColumn.Type,
      TableColumn.Status,
      TableColumn.Size,
      TableColumn.Duration,
    ]),
  }

  const result = GetColumnVisibilityFlags.getColumnVisibilityFlags(state.tableColumns, TableColumn.Method)

  expect(result).toBe(MenuItemFlags.Unchecked)
})

test('getColumnVisibilityFlags should return unchecked for a hidden size column', () => {
  const state = {
    ...createDefaultState(),
    tableColumns: TableColumn.getTableColumnsWithVisibility(createDefaultState().tableColumns, [
      TableColumn.Type,
      TableColumn.Method,
      TableColumn.Status,
      TableColumn.Duration,
    ]),
  }

  const result = GetColumnVisibilityFlags.getColumnVisibilityFlags(state.tableColumns, TableColumn.Size)

  expect(result).toBe(MenuItemFlags.Unchecked)
})
