import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import { createDetailTabs } from '../src/parts/CreateDetailTabs/CreateDetailTabs.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { getSelectedDetailTab } from '../src/parts/GetSelectedDetailTab/GetSelectedDetailTab.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as ChatDebugViewStates from '../src/parts/State/ChatDebugViewStates.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('create should store state with the given uid', () => {
  const uid = 123
  Create.create(uid, 'file:///debug', 10, 20, 300, 400, 0, '/assets')
  const result = ChatDebugViewStates.get(uid)
  const { newState } = result
  const { oldState } = result

  expect(newState.uid).toBe(uid)
  expect(newState.uri).toBe('file:///debug')
  expect(newState.x).toBe(10)
  expect(newState.y).toBe(20)
  expect(newState.width).toBe(300)
  expect(newState.height).toBe(400)
  expect(newState.assetDir).toBe('/assets')
  expect(newState.detailTabs).toEqual(createDetailTabs())
  expect(newState.tableColumns).toEqual(TableColumn.createTableColumns())
  expect(newState.sessionId).toBe('')
  expect(oldState.uid).toBe(uid)
  expect(oldState.detailTabs).toEqual(createDetailTabs())
  expect(oldState.tableColumns).toEqual(TableColumn.createTableColumns())
  expect(oldState.selectedEventId).toBeNull()
})

test('create should restore serializable state from saved state', () => {
  const uid = 124
  Create.create(uid, 'file:///debug', 10, 20, 300, 400, 0, '/assets', '', 'lvce-chat-view-sessions', 2, 'chat-view-events', 'sessionId', {
    eventCategoryFilter: EventCategoryFilter.Tools,
    selectedDetailTab: InputName.Preview,
    selectedEventId: 7,
    tableColumnWidths: {
      duration: 88,
      method: 92,
      size: 104,
      status: 132,
      type: 260,
    },
  })
  const result = ChatDebugViewStates.get(uid)

  expect(EventCategoryFilter.getSelectedEventCategoryFilter(result.newState.categoryFilters)).toBe(EventCategoryFilter.Tools)
  expect(EventCategoryFilter.getSelectedEventCategoryFilter(result.oldState.categoryFilters)).toBe(EventCategoryFilter.Tools)
  expect(getSelectedDetailTab(result.newState.detailTabs)).toBe(InputName.Preview)
  expect(getSelectedDetailTab(result.oldState.detailTabs)).toBe(InputName.Preview)
  expect(result.newState.selectedEventId).toBe(7)
  expect(result.oldState.selectedEventId).toBe(7)
  expect(TableColumn.getTableColumnWidths(result.newState.tableColumns)).toEqual({
    duration: 88,
    method: 92,
    size: 104,
    status: 132,
    type: 260,
  })
  expect(TableColumn.getTableColumnWidths(result.oldState.tableColumns)).toEqual({
    duration: 88,
    method: 92,
    size: 104,
    status: 132,
    type: 260,
  })
  expect(result.newState.tableWidth).toBe(result.newState.defaultTableWidth)
  expect(result.oldState.tableWidth).toBe(result.oldState.defaultTableWidth)
})

test('create should not restore event category filter from filter text when the explicit field is missing', () => {
  const uid = 125
  Create.create(uid, 'file:///debug', 10, 20, 300, 400, 0, '/assets', '', 'lvce-chat-view-sessions', 2, 'chat-view-events', 'sessionId', {
    filterValue: '@network error',
  })
  const result = ChatDebugViewStates.get(uid)

  expect(EventCategoryFilter.getSelectedEventCategoryFilter(result.newState.categoryFilters)).toBe(EventCategoryFilter.All)
  expect(EventCategoryFilter.getSelectedEventCategoryFilter(result.oldState.categoryFilters)).toBe(EventCategoryFilter.All)
  expect(result.newState.filterValue).toBe('@network error')
  expect(result.oldState.filterValue).toBe('@network error')
})
