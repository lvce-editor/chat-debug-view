import { afterEach, expect, jest, test } from '@jest/globals'
import * as DetailTab from '../src/parts/DetailTab/DetailTab.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { getFailedToLoadMessage } from '../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { getStateWithTimelineInfo } from '../src/parts/GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { loadContent, loadContentDependencies } from '../src/parts/LoadContent/LoadContent.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

const categoryFilters = EventCategoryFilter.createCategoryFilters()
const tableColumns = TableColumn.createTableColumns()
const detailTabs = DetailTab.createDetailTabs()
const previewDetailTabs = DetailTab.createDetailTabs('preview')

afterEach(() => {
  jest.restoreAllMocks()
})

test('loadContent should return failed-to-load state when listing events returns an error', async () => {
  const error = new Error('failed to load events')
  const listChatViewEventsSpy = jest.spyOn(loadContentDependencies, 'listChatViewEvents').mockResolvedValue({
    error,
    type: 'error',
  })
  const state = {
    ...createDefaultState(),
    initial: true,
    uri: 'chat-debug://session-1',
  }

  const result = await loadContent(state, {})

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...state,
      categoryFilters,
      detailTabs,
      errorMessage: getFailedToLoadMessage('session-1', error),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventIndex: null,
      sessionId: 'session-1',
      tableColumns,
    }),
  )
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
})

test('loadContent should restore the selected event preview from selectedEventId', async () => {
  const events = [
    { eventId: 1, type: 'request' },
    { eventId: 2, type: 'response' },
  ]
  const selectedEvent = {
    detail: 'restored',
    eventId: 2,
    type: 'response',
  }
  const listChatViewEventsSpy = jest.spyOn(loadContentDependencies, 'listChatViewEvents').mockResolvedValue({
    events,
    type: 'success',
  })
  const loadSelectedEventSpy = jest.spyOn(loadContentDependencies, 'loadSelectedEvent').mockResolvedValue(selectedEvent)
  const state = {
    ...createDefaultState(),
    initial: true,
    selectedEventId: 2,
    uri: 'chat-debug://session-1',
    useDevtoolsLayout: true,
  }

  const result = await loadContent(state, {})

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...state,
      categoryFilters,
      detailTabs,
      errorMessage: '',
      events,
      initial: false,
      selectedEvent,
      selectedEventId: 2,
      selectedEventIndex: 1,
      sessionId: 'session-1',
      tableColumns,
    }),
  )
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
  expect(loadSelectedEventSpy).toHaveBeenCalledTimes(1)
  expect(loadSelectedEventSpy).toHaveBeenCalledWith('lvce-chat-view-sessions', 2, 'chat-view-events', 'session-1', 'sessionId', 2, 'response')
})

test('loadContent should restore selected event and detail tab from savedState', async () => {
  const events = [
    { eventId: 1, type: 'request' },
    { eventId: 2, type: 'response' },
  ]
  const selectedEvent = {
    detail: 'restored',
    eventId: 2,
    type: 'response',
  }
  const listChatViewEventsSpy = jest.spyOn(loadContentDependencies, 'listChatViewEvents').mockResolvedValue({
    events,
    type: 'success',
  })
  const loadSelectedEventSpy = jest.spyOn(loadContentDependencies, 'loadSelectedEvent').mockResolvedValue(selectedEvent)
  const state = {
    ...createDefaultState(),
    initial: true,
    selectedEventId: null,
    uri: 'chat-debug://session-1',
    useDevtoolsLayout: true,
  }
  const savedState = {
    selectedDetailTab: 'preview',
    selectedEventId: 2,
  }

  const result = await loadContent(state, savedState)

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...state,
      categoryFilters,
      detailTabs: previewDetailTabs,
      errorMessage: '',
      events,
      initial: false,
      selectedEvent,
      selectedEventId: 2,
      selectedEventIndex: 1,
      sessionId: 'session-1',
      tableColumns,
    }),
  )
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
  expect(loadSelectedEventSpy).toHaveBeenCalledTimes(1)
  expect(loadSelectedEventSpy).toHaveBeenCalledWith('lvce-chat-view-sessions', 2, 'chat-view-events', 'session-1', 'sessionId', 2, 'response')
})
