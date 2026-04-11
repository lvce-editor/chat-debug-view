import { expect, test } from '@jest/globals'
import * as DetailTab from '../src/parts/DetailTab/DetailTab.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('createDefaultState should return expected defaults', () => {
  const state = createDefaultState()
  expect(state).toBeDefined()
  expect(state.categoryFilters).toEqual(EventCategoryFilter.createCategoryFilters())
  expect(state.detailTabs).toEqual(DetailTab.createDetailTabs())
  expect(DetailTab.getSelectedDetailTab(state.detailTabs)).toBe('response')
  expect(state.tableColumns).toEqual([])
  expect(state.tableColumnWidths).toEqual({
    duration: 110,
    status: 110,
    type: 260,
  })
  expect(state.sortColumn).toBe('')
  expect(state.sortDescending).toBe(false)
})
