import { expect, test } from '@jest/globals'
import * as SaveState from '../src/parts/SaveState/SaveState.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('saveState should persist serializable non-layout state fields', () => {
  const state = {
    ...createDefaultState(),
    eventCategoryFilter: 'tools',
    filterValue: 'error',
    selectedDetailTab: 'preview',
    selectedEventId: 3,
    selectedEventIndex: 2,
    sessionId: 'session-1',
    timelineEndSeconds: '7',
    timelineStartSeconds: '5',
    visibleTableColumns: ['type', 'status'],
  }
  const result = SaveState.saveState(state)

  expect(result).toEqual({
    eventCategoryFilter: 'tools',
    filterValue: 'error',
    selectedDetailTab: 'preview',
    selectedEventId: 3,
    sessionId: 'session-1',
    timelineEndSeconds: '7',
    timelineStartSeconds: '5',
    visibleTableColumns: ['type', 'status'],
  })
})
