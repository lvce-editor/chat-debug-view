import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { defaultTableWidth } from '../src/parts/SplitLayout/SplitLayout.ts'
import * as ChatDebugViewStates from '../src/parts/State/ChatDebugViewStates.ts'

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
  expect(newState.detailTabs).toEqual([])
  expect(newState.sessionId).toBe('')
  expect(oldState.uid).toBe(uid)
  expect(oldState.detailTabs).toEqual([])
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
      status: 132,
      type: 260,
    },
  })
  const result = ChatDebugViewStates.get(uid)

  expect(result.newState.eventCategoryFilter).toBe(EventCategoryFilter.Tools)
  expect(result.oldState.eventCategoryFilter).toBe(EventCategoryFilter.Tools)
  expect(result.newState.selectedDetailTab).toBe(InputName.Preview)
  expect(result.oldState.selectedDetailTab).toBe(InputName.Preview)
  expect(result.newState.selectedEventId).toBe(7)
  expect(result.oldState.selectedEventId).toBe(7)
  expect(result.newState.tableColumnWidths).toEqual({
    duration: 88,
    status: 132,
    type: 260,
  })
  expect(result.oldState.tableColumnWidths).toEqual({
    duration: 88,
    status: 132,
    type: 260,
  })
  expect(result.newState.tableWidth).toBe(defaultTableWidth)
  expect(result.oldState.tableWidth).toBe(defaultTableWidth)
})

test('create should restore event category filter from filter tokens when the explicit field is missing', () => {
  const uid = 125
  Create.create(uid, 'file:///debug', 10, 20, 300, 400, 0, '/assets', '', 'lvce-chat-view-sessions', 2, 'chat-view-events', 'sessionId', {
    filterValue: '@network error',
  })
  const result = ChatDebugViewStates.get(uid)

  expect(result.newState.eventCategoryFilter).toBe(EventCategoryFilter.Network)
  expect(result.oldState.eventCategoryFilter).toBe(EventCategoryFilter.Network)
  expect(result.newState.filterValue).toBe('@network error')
  expect(result.oldState.filterValue).toBe('@network error')
})
