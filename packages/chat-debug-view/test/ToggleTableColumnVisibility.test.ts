import { expect, test } from '@jest/globals'
import { resetTableColumns } from '../src/parts/ResetTableColumns/ResetTableColumns.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'
import { toggleTableColumnVisibility } from '../src/parts/ToggleTableColumnVisibility/ToggleTableColumnVisibility.ts'

test('toggleTableColumnVisibility should hide a visible column', () => {
  const state = createDefaultState()

  const result = toggleTableColumnVisibility(state, 'duration')

  expect(TableColumn.getVisibleTableColumns(result.tableColumns)).toEqual(['type', 'method', 'status'])
})

test('toggleTableColumnVisibility should restore original ordering when re-enabling a column', () => {
  const state = {
    ...createDefaultState(),
    tableColumns: TableColumn.getTableColumnsWithVisibility(createDefaultState().tableColumns, ['type', 'method', 'status']),
  }

  const result = toggleTableColumnVisibility(state, 'duration')

  expect(TableColumn.getVisibleTableColumns(result.tableColumns)).toEqual(['type', 'method', 'status', 'duration'])
})

test('resetTableColumns should restore default columns', () => {
  const state = {
    ...createDefaultState(),
    tableColumns: TableColumn.getTableColumnsWithVisibility(createDefaultState().tableColumns, ['type', 'method', 'status']),
    tableColumnWidths: {
      duration: 80,
      method: 90,
      status: 140,
      type: 260,
    },
  }

  const result = resetTableColumns(state)

  expect(TableColumn.getVisibleTableColumns(result.tableColumns)).toEqual(['type', 'method', 'status', 'duration'])
  expect(result.tableColumnWidths).toEqual(createDefaultState().tableColumnWidths)
})
