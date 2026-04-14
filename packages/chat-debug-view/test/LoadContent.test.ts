import { afterEach, expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as DetailTab from '../src/parts/DetailTab/DetailTab.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { getFailedToLoadMessage } from '../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { getStateWithTimelineInfo } from '../src/parts/GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { rpcId as handleStorageWorkerUpdateRpcId } from '../src/parts/HandleStorageWorkerUpdate/HandleStorageWorkerUpdate.ts'
import { loadContent, loadContentDependencies } from '../src/parts/LoadContent/LoadContent.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

const tableColumns = TableColumn.createTableColumns()
const detailTabs = DetailTab.createDetailTabs()

afterEach(() => {
  jest.restoreAllMocks()
})

test('loadContent should return failed-to-load state when listing events returns an error', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => false,
  })
  const error = new Error('failed to load events')
  const listChatViewEventsSpy = jest.spyOn(loadContentDependencies, 'listChatViewEvents').mockResolvedValue({
    error,
    type: 'error',
  })
  const registerUpdateListenerSpy = jest.spyOn(loadContentDependencies, 'registerUpdateListener').mockResolvedValue(undefined)
  const state = {
    ...createDefaultState(),
    initial: true,
    uid: 5,
    uri: 'chat-debug://session-1',
  }

  const result = await loadContent(state, {})

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...state,
      categoryFilters: EventCategoryFilter.createCategoryFilters(),
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
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'chatDebug.autoRefresh']])
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
  expect(registerUpdateListenerSpy).toHaveBeenCalledTimes(1)
  expect(registerUpdateListenerSpy).toHaveBeenCalledWith('session-1', handleStorageWorkerUpdateRpcId, 5)
})

test('loadContent should restore the selected event preview from selectedEventId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => true,
  })
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
  const registerUpdateListenerSpy = jest.spyOn(loadContentDependencies, 'registerUpdateListener').mockResolvedValue(undefined)
  const state = {
    ...createDefaultState(),
    initial: true,
    selectedEventId: 2,
    uid: 8,
    uri: 'chat-debug://session-1',
    useDevtoolsLayout: true,
  }

  const result = await loadContent(state, {})

  expect(result).toEqual(
    getStateWithTimelineInfo({
      ...state,
      categoryFilters: EventCategoryFilter.createCategoryFilters('response'),
      detailTabs: DetailTab.createDetailTabs('response', selectedEvent),
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
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'chatDebug.autoRefresh']])
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
  expect(loadSelectedEventSpy).toHaveBeenCalledTimes(1)
  expect(loadSelectedEventSpy).toHaveBeenCalledWith('lvce-chat-view-sessions', 2, 'chat-view-events', 'session-1', 'sessionId', 2, 'response')
  expect(registerUpdateListenerSpy).toHaveBeenCalledTimes(1)
  expect(registerUpdateListenerSpy).toHaveBeenCalledWith('session-1', handleStorageWorkerUpdateRpcId, 8)
})

test('loadContent should restore selected event and detail tab from savedState', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => true,
  })
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
  const registerUpdateListenerSpy = jest.spyOn(loadContentDependencies, 'registerUpdateListener').mockResolvedValue(undefined)
  const state = {
    ...createDefaultState(),
    initial: true,
    selectedEventId: null,
    uid: 9,
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
      categoryFilters: EventCategoryFilter.createCategoryFilters('response'),
      detailTabs: DetailTab.createDetailTabs('preview', selectedEvent),
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
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'chatDebug.autoRefresh']])
  expect(listChatViewEventsSpy).toHaveBeenCalledTimes(1)
  expect(loadSelectedEventSpy).toHaveBeenCalledTimes(1)
  expect(loadSelectedEventSpy).toHaveBeenCalledWith('lvce-chat-view-sessions', 2, 'chat-view-events', 'session-1', 'sessionId', 2, 'response')
  expect(registerUpdateListenerSpy).toHaveBeenCalledTimes(1)
  expect(registerUpdateListenerSpy).toHaveBeenCalledWith('session-1', handleStorageWorkerUpdateRpcId, 9)
})
