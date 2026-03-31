import { expect, test } from '@jest/globals'
import * as SaveState from '../src/parts/SaveState/SaveState.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('saveState should persist serializable state fields', () => {
  const state = {
    ...createDefaultState(),
    eventCategoryFilter: 'tools',
    filterValue: 'error',
    height: 200,
    selectedEventIndex: 2,
    sessionId: 'session-1',
    showEventStreamFinishedEvents: false,
    showInputEvents: false,
    showResponsePartEvents: false,
    useDevtoolsLayout: true,
    width: 300,
    x: 1,
    y: 2,
  }
  const result = SaveState.saveState(state)

  expect(result).toEqual({
    eventCategoryFilter: 'tools',
    filterValue: 'error',
    height: 200,
    sessionId: 'session-1',
    showEventStreamFinishedEvents: false,
    showInputEvents: false,
    showResponsePartEvents: false,
    useDevtoolsLayout: true,
    width: 300,
    x: 1,
    y: 2,
  })
})
