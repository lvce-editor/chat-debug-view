import { expect, test } from '@jest/globals'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { restoreSavedState } from '../src/parts/RestoreSavedState/RestoreSavedState.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('restoreSavedState should restore multiple selected event category filters', () => {
  const state = createDefaultState()

  const result = restoreSavedState(state, {
    eventCategoryFilters: [EventCategoryFilter.Tools, EventCategoryFilter.Network],
  })

  expect(EventCategoryFilter.getSelectedEventCategoryFilters(result.categoryFilters)).toEqual([
    EventCategoryFilter.Tools,
    EventCategoryFilter.Network,
  ])
})

test('restoreSavedState should ignore removed ui and stream category filters', () => {
  const state = createDefaultState()

  const result = restoreSavedState(state, {
    eventCategoryFilters: [EventCategoryFilter.Ui, EventCategoryFilter.Stream],
  })

  expect(EventCategoryFilter.getSelectedEventCategoryFilters(result.categoryFilters)).toEqual([EventCategoryFilter.All])
})

test('restoreSavedState should restore visible table columns', () => {
  const state = createDefaultState()

  const result = restoreSavedState(state, {
    visibleTableColumns: ['status', 'type'],
  })

  expect(TableColumn.getVisibleTableColumns(result.tableColumns)).toEqual(['type', 'status'])
})

test('restoreSavedState should ignore invalid visible table columns', () => {
  const state = createDefaultState()

  const result = restoreSavedState(state, {
    visibleTableColumns: ['type', 'unknown'],
  })

  expect(TableColumn.getVisibleTableColumns(result.tableColumns)).toEqual(['type'])
})

test('restoreSavedState should restore table column widths', () => {
  const state = createDefaultState()

  const result = restoreSavedState(state, {
    tableColumnWidths: {
      duration: 80,
      method: 92,
      size: 104,
      status: 140,
      type: 260,
    },
  })

  expect(TableColumn.getTableColumnWidths(result.tableColumns)).toEqual({
    duration: 80,
    method: 92,
    size: 104,
    status: 140,
    type: 260,
  })
})

test('restoreSavedState should ignore invalid table column widths', () => {
  const state = createDefaultState()

  const result = restoreSavedState(state, {
    tableColumnWidths: {
      duration: 'wide',
      method: 92,
      status: 140,
      type: 260,
    },
  })

  expect(TableColumn.getTableColumnWidths(result.tableColumns)).toEqual(TableColumn.getTableColumnWidths(state.tableColumns))
})

test('restoreSavedState should add new visible columns for legacy saved state', () => {
  const state = createDefaultState()

  const result = restoreSavedState(state, {
    tableColumnWidths: {
      duration: 80,
      method: 92,
      status: 140,
      type: 260,
    },
    visibleTableColumns: ['type', 'status'],
  })

  expect(TableColumn.getVisibleTableColumns(result.tableColumns)).toEqual(['type', 'status', 'size'])
})

test('restoreSavedState should merge legacy table column widths with current defaults', () => {
  const state = createDefaultState()

  const result = restoreSavedState(state, {
    tableColumnWidths: {
      duration: 80,
      method: 92,
      status: 140,
      type: 260,
    },
  })

  expect(TableColumn.getTableColumnWidths(result.tableColumns)).toEqual({
    duration: 80,
    method: 92,
    size: TableColumn.getTableColumnByName(state.tableColumns, TableColumn.Size)?.width,
    status: 140,
    type: 260,
  })
})

test('restoreSavedState should keep default minimum widths on restored table columns', () => {
  const state = createDefaultState()

  const result = restoreSavedState(state, {
    tableColumnWidths: {
      duration: 80,
      method: 92,
      size: 104,
      status: 140,
      type: 260,
    },
  })

  expect(TableColumn.getTableColumnByName(result.tableColumns, TableColumn.Method)?.minimumWidth).toBe(56)
  expect(TableColumn.getTableColumnByName(result.tableColumns, TableColumn.Size)?.defaultWidth).toBe(100)
})
