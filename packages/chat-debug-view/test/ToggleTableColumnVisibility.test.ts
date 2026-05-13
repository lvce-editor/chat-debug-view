import { expect, test } from '@jest/globals'
import type { ChatDebugViewState } from '../src/parts/State/ChatDebugViewState.ts'
import { resetTableColumns } from '../src/parts/ResetTableColumns/ResetTableColumns.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'
import { toggleTableColumnVisibility } from '../src/parts/ToggleTableColumnVisibility/ToggleTableColumnVisibility.ts'

test('toggleTableColumnVisibility should hide a visible column', () => {
  const state = createDefaultState()

  const result = toggleTableColumnVisibility(state, 'duration')

  expect(TableColumn.getVisibleTableColumns(result.tableColumns)).toEqual(['type', 'method', 'status', 'size'])
})

test('toggleTableColumnVisibility should restore original ordering when re-enabling a column', () => {
  const state = {
    ...createDefaultState(),
    tableColumns: TableColumn.getTableColumnsWithVisibility(createDefaultState().tableColumns, ['type', 'method', 'status', 'size']),
  }

  const result = toggleTableColumnVisibility(state, 'duration')

  expect(TableColumn.getVisibleTableColumns(result.tableColumns)).toEqual(['type', 'method', 'status', 'size', 'duration'])
})

test('resetTableColumns should restore default columns', () => {
  const state: ChatDebugViewState = {
    ...createDefaultState(),
    sortColumn: TableColumn.Type,
    sortDescending: true,
    tableColumns: TableColumn.getTableColumnsWithVisibility(createDefaultState().tableColumns, ['type', 'method', 'status', 'size']),
  }
  const resizedState: ChatDebugViewState = {
    ...state,
    tableColumns: TableColumn.setTableColumnWidths(state.tableColumns, {
      duration: 80,
      method: 90,
      size: 120,
      status: 140,
      type: 260,
    }),
  }

  const result = resetTableColumns(resizedState)

  expect(TableColumn.getVisibleTableColumns(result.tableColumns)).toEqual(['type', 'method', 'status', 'size', 'duration'])
  expect(TableColumn.getTableColumnWidths(result.tableColumns)).toEqual(TableColumn.getTableColumnWidths(createDefaultState().tableColumns))
  expect(result.sortColumn).toBe('')
  expect(result.sortDescending).toBe(false)
})
