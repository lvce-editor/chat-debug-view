import { expect, test } from '@jest/globals'
import * as DetailTab from '../src/parts/DetailTab/DetailTab.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import * as SaveState from '../src/parts/SaveState/SaveState.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('saveState should persist serializable non-layout state fields', () => {
  const state = {
    ...createDefaultState(),
    categoryFilters: EventCategoryFilter.createCategoryFilters(EventCategoryFilter.Tools),
    detailTabs: DetailTab.createDetailTabs('preview'),
    filterValue: 'error',
    selectedEventId: 3,
    selectedEventIndex: 2,
    sessionId: 'session-1',
    tableColumnWidths: {
      duration: 96,
      status: 124,
      type: 260,
    },
    timelineEndSeconds: '7',
    timelineStartSeconds: '5',
    visibleTableColumns: ['type', 'status'],
  }
  const result = SaveState.saveState(state)

  expect(result).toEqual({
    eventCategoryFilter: 'tools',
    eventCategoryFilters: ['tools'],
    filterValue: 'error',
    selectedDetailTab: 'preview',
    selectedEventId: 3,
    sessionId: 'session-1',
    tableColumnWidths: {
      duration: 96,
      status: 124,
      type: 260,
    },
    timelineEndSeconds: '7',
    timelineStartSeconds: '5',
    visibleTableColumns: ['type', 'status'],
  })
})
