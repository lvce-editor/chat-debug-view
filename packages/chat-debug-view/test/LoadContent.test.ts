import { expect, test } from '@jest/globals'
import { ChatStorageWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { createDetailTabs } from '../src/parts/CreateDetailTabs/CreateDetailTabs.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { getFailedToLoadMessage } from '../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { getStateWithTimelineInfo } from '../src/parts/GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { rpcId as handleStorageWorkerUpdateRpcId } from '../src/parts/HandleStorageWorkerUpdate/HandleStorageWorkerUpdate.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

const tableColumns = TableColumn.createTableColumns()
const detailTabs = createDetailTabs()

test('loadContent should return failed-to-load state when listing events returns an error', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => false,
  })
  using chatStorageRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => {
      throw error
    },
    'ChatStorage.registerUpdateListener': () => undefined,
  })
  const error = new Error('failed to load events')
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
  expect(rendererRpc.invocations).toEqual([['Preferences.get', 'chatDebug.autoRefresh']])
  expect(chatStorageRpc.invocations).toEqual([
    ['ChatStorage.listChatViewEvents', 'session-1'],
    ['ChatStorage.registerUpdateListener', 'session-1', handleStorageWorkerUpdateRpcId, 5],
  ])
})

test('loadContent should restore the selected event preview from selectedEventId', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => true,
  })
  const events = [
    { eventId: 1, subType: 'request', type: 'request' },
    { eventId: 2, subType: 'response', type: 'response' },
  ]
  const selectedEvent = {
    detail: 'restored',
    eventId: 2,
    subType: 'response',
    type: 'response',
  }
  using chatStorageRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => ({
      events,
      type: 'success' as const,
    }),
    'ChatStorage.loadSelectedEvent': () => selectedEvent,
    'ChatStorage.registerUpdateListener': () => undefined,
  })
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
      detailTabs: createDetailTabs('response', selectedEvent),
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
  expect(rendererRpc.invocations).toEqual([['Preferences.get', 'chatDebug.autoRefresh']])
  expect(chatStorageRpc.invocations).toEqual([
    ['ChatStorage.listChatViewEvents', 'session-1'],
    ['ChatStorage.loadSelectedEvent', 'session-1', 2, 'response'],
    ['ChatStorage.registerUpdateListener', 'session-1', handleStorageWorkerUpdateRpcId, 8],
  ])
})

test('loadContent should restore selected event and detail tab from savedState', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => true,
  })
  const events = [
    { eventId: 1, subType: 'request', type: 'request' },
    { eventId: 2, subType: 'response', type: 'response' },
  ]
  const selectedEvent = {
    detail: 'restored',
    eventId: 2,
    subType: 'response',
    type: 'response',
  }
  using chatStorageRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => ({
      events,
      type: 'success' as const,
    }),
    'ChatStorage.loadSelectedEvent': () => selectedEvent,
    'ChatStorage.registerUpdateListener': () => undefined,
  })
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
      detailTabs: createDetailTabs('preview', selectedEvent),
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
  expect(rendererRpc.invocations).toEqual([['Preferences.get', 'chatDebug.autoRefresh']])
  expect(chatStorageRpc.invocations).toEqual([
    ['ChatStorage.listChatViewEvents', 'session-1'],
    ['ChatStorage.loadSelectedEvent', 'session-1', 2, 'response'],
    ['ChatStorage.registerUpdateListener', 'session-1', handleStorageWorkerUpdateRpcId, 9],
  ])
})

test('loadContent should initialize the virtual table window on first load when the view has height', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => true,
  })
  const events = Array.from({ length: 8 }, (_, index) => {
    return {
      eventId: index + 1,
      subType: index % 2 === 0 ? 'request' : 'response',
      type: index % 2 === 0 ? 'request' : 'response',
    }
  })
  using chatStorageRpc = ChatStorageWorker.registerMockRpc({
    'ChatStorage.listChatViewEvents': () => ({
      events,
      type: 'success' as const,
    }),
    'ChatStorage.registerUpdateListener': () => undefined,
  })
  const state = {
    ...createDefaultState(),
    height: 600,
    initial: true,
    uid: 10,
    uri: 'chat-debug://session-1',
    useDevtoolsLayout: true,
    width: 900,
    x: 10,
    y: 20,
  }

  const result = await loadContent(state, {})

  expect(result.tableMinLineY).toBe(0)
  expect(result.tableMaxLineY).toBeGreaterThan(0)
  expect(result.tableMaxLineY).toBeLessThanOrEqual(events.length)
  expect(rendererRpc.invocations).toEqual([['Preferences.get', 'chatDebug.autoRefresh']])
  expect(chatStorageRpc.invocations).toEqual([
    ['ChatStorage.listChatViewEvents', 'session-1'],
    ['ChatStorage.registerUpdateListener', 'session-1', handleStorageWorkerUpdateRpcId, 10],
  ])
})
