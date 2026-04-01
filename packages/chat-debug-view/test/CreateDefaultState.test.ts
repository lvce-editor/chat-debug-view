import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('createDefaultState should return expected defaults', () => {
  const state = createDefaultState()
  expect(state).toEqual({
    assetDir: '',
    databaseName: 'lvce-chat-view-sessions',
    dataBaseVersion: 2,
    errorMessage: '',
    eventCategoryFilter: 'all',
    events: [],
    eventStoreName: 'chat-view-events',
    filterValue: '',
    height: 0,
    initial: false,
    platform: 0,
    selectedEventIndex: null,
    sessionId: '',
    sessionIdIndexName: 'sessionId',
    showEventStreamFinishedEvents: false,
    showInputEvents: false,
    showResponsePartEvents: false,
    timelineEndSeconds: '',
    timelineStartSeconds: '',
    uid: 0,
    uri: '',
    useDevtoolsLayout: true,
    width: 0,
    x: 0,
    y: 0,
  })
})
