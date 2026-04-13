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
