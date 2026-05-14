import { expect, test } from '@jest/globals'
import { createDetailTabs } from '../src/parts/CreateDetailTabs/CreateDetailTabs.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { getSelectedDetailTab } from '../src/parts/GetSelectedDetailTab/GetSelectedDetailTab.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('createDefaultState should return expected defaults', () => {
  const state = createDefaultState()
  const sortableState = state as typeof state & {
    readonly largeBreakpoint: number
    readonly mediumBreakpoint: number
    readonly sortColumn: string
    readonly sortDescending: boolean
  }
  expect(state).toBeDefined()
  expect(state.categoryFilters).toEqual(EventCategoryFilter.createCategoryFilters())
  expect(state.detailTabs).toEqual(createDetailTabs())
  expect(getSelectedDetailTab(state.detailTabs)).toBe('response')
  expect(state.tableColumns).toEqual(TableColumn.createTableColumns())
  expect(state.tableColumnWidths).toEqual({
    duration: 110,
    method: 90,
    size: 100,
    status: 110,
    type: 260,
  })
  expect(state.timelineFilterDescription).toBe('')
  expect(state.timelineHeight).toBe(81)
  expect(state.defaultTableWidth).toBe(480)
  expect(state.devtoolsRootGap).toBe(4)
  expect(state.devtoolsTopHeight).toBe(28)
  expect(state.devtoolsTimelineHeight).toBe(88)
  expect(state.horizontalPadding).toBe(16)
  expect(state.leftPadding).toBe(8)
  expect(state.minDetailsWidth).toBe(280)
  expect(state.minTableWidth).toBe(240)
  expect(state.sashWidth).toBe(4)
  expect(state.summaries).toEqual([])
  expect(state.tableWidthManuallyResized).toBe(false)
  expect(sortableState.mediumBreakpoint).toBe(600)
  expect(sortableState.largeBreakpoint).toBe(900)
  expect(sortableState.sortColumn).toBe('')
  expect(sortableState.sortDescending).toBe(false)
  expect(state.timelineHorizontalPadding).toBe(10)
  expect(state.viewPadding).toBe(8)
})
