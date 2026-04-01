import { afterEach, beforeEach, expect, jest, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

const originalIndexedDb = globalThis.indexedDB

beforeEach(() => {
  jest.resetModules()
})

afterEach(() => {
  jest.restoreAllMocks()
  if (typeof originalIndexedDb === 'undefined') {
    Reflect.deleteProperty(globalThis, 'indexedDB')
  } else {
    Object.defineProperty(globalThis, 'indexedDB', {
      configurable: true,
      value: originalIndexedDb,
    })
  }
})

test('listChatViewEvents should return an empty array when indexedDB is unavailable', async () => {
  Reflect.deleteProperty(globalThis, 'indexedDB')
  const { listChatViewEvents } = await import('../src/parts/ListChatViewEvents/ListChatViewEvents.ts')

  const result = await listChatViewEvents('session-1', 'db', 1, 'events', 'sessionId')

  expect(result).toEqual([])
})

test('listChatViewEvents should return an empty array when the store does not exist and close the database', async () => {
  Object.defineProperty(globalThis, 'indexedDB', {
    configurable: true,
    value: {},
  })
  const close = jest.fn()
  const openDatabase = jest.fn(async () => ({
    close,
    objectStoreNames: {
      contains: () => false,
    },
  }))

  jest.unstable_mockModule('../src/parts/OpenDatabase/OpenDatabase.ts', () => ({
    openDatabase,
  }))
  jest.unstable_mockModule('../src/parts/GetEventsBySessionId/GetEventsBySessionId.ts', () => ({
    getEventsBySessionId: jest.fn(),
  }))

  const { listChatViewEvents } = await import('../src/parts/ListChatViewEvents/ListChatViewEvents.ts')

  const result = await listChatViewEvents('session-1', 'db', 1, 'events', 'sessionId')

  expect(result).toEqual([])
  expect(close).toHaveBeenCalledTimes(1)
})

test('listChatViewEvents should return an empty array when the session id is missing and close the database', async () => {
  Object.defineProperty(globalThis, 'indexedDB', {
    configurable: true,
    value: {},
  })
  const close = jest.fn()
  const getEventsBySessionId = jest.fn()
  const openDatabase = jest.fn(async () => ({
    close,
    objectStoreNames: {
      contains: () => true,
    },
    transaction: () => ({
      objectStore: () => ({
        id: 'store',
      }),
    }),
  }))

  jest.unstable_mockModule('../src/parts/OpenDatabase/OpenDatabase.ts', () => ({
    openDatabase,
  }))
  jest.unstable_mockModule('../src/parts/GetEventsBySessionId/GetEventsBySessionId.ts', () => ({
    getEventsBySessionId,
  }))

  const { listChatViewEvents } = await import('../src/parts/ListChatViewEvents/ListChatViewEvents.ts')

  const result = await listChatViewEvents('', 'db', 1, 'events', 'sessionId')

  expect(result).toEqual([])
  expect(getEventsBySessionId).not.toHaveBeenCalled()
  expect(close).toHaveBeenCalledTimes(1)
})

test('listChatViewEvents should read events from the store and close the database', async () => {
  Object.defineProperty(globalThis, 'indexedDB', {
    configurable: true,
    value: {},
  })
  const close = jest.fn()
  const store = {
    id: 'store',
  }
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    },
  ]
  const getEventsBySessionId = jest.fn(async () => events)
  const openDatabase = jest.fn(async () => ({
    close,
    objectStoreNames: {
      contains: () => true,
    },
    transaction: () => ({
      objectStore: () => store,
    }),
  }))

  jest.unstable_mockModule('../src/parts/OpenDatabase/OpenDatabase.ts', () => ({
    openDatabase,
  }))
  jest.unstable_mockModule('../src/parts/GetEventsBySessionId/GetEventsBySessionId.ts', () => ({
    getEventsBySessionId,
  }))

  const { listChatViewEvents } = await import('../src/parts/ListChatViewEvents/ListChatViewEvents.ts')

  const result = await listChatViewEvents('session-1', 'db', 1, 'events', 'sessionId')

  expect(result).toEqual(events)
  expect(getEventsBySessionId).toHaveBeenCalledWith(store, 'session-1', 'sessionId')
  expect(close).toHaveBeenCalledTimes(1)
})

test('loadContent should return an invalid uri state when parsing fails', async () => {
  const parseChatDebugUri = jest.fn(() => ({
    code: 'invalid-uri',
    type: 'error',
  }))

  jest.unstable_mockModule('../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts', () => ({
    getFailedToLoadMessage: jest.fn(() => 'failed'),
  }))
  jest.unstable_mockModule('../src/parts/GetInvalidUriMessage/GetInvalidUriMessage.ts', () => ({
    getInvalidUriMessage: jest.fn(() => 'invalid'),
  }))
  jest.unstable_mockModule('../src/parts/GetSessionNotFoundMessage/GetSessionNotFoundMessage.ts', () => ({
    getSessionNotFoundMessage: jest.fn(() => 'missing'),
  }))
  jest.unstable_mockModule('../src/parts/ListChatViewEvents/ListChatViewEvents.ts', () => ({
    listChatViewEvents: jest.fn(),
  }))
  jest.unstable_mockModule('../src/parts/ParseChatDebugUri/ParseChatDebugUri.ts', () => ({
    parseChatDebugUri,
  }))

  const { loadContent } = await import('../src/parts/LoadContent/LoadContent.ts')

  const result = await loadContent({
    ...createDefaultState(),
    uri: 'invalid',
  })

  expect(result).toEqual({
    ...createDefaultState(),
    errorMessage: 'invalid',
    events: [],
    initial: false,
    selectedEventIndex: null,
    sessionId: '',
    uri: 'invalid',
  })
})

test('loadContent should return a session-not-found state when there are no events', async () => {
  jest.unstable_mockModule('../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts', () => ({
    getFailedToLoadMessage: jest.fn(() => 'failed'),
  }))
  jest.unstable_mockModule('../src/parts/GetInvalidUriMessage/GetInvalidUriMessage.ts', () => ({
    getInvalidUriMessage: jest.fn(() => 'invalid'),
  }))
  jest.unstable_mockModule('../src/parts/GetSessionNotFoundMessage/GetSessionNotFoundMessage.ts', () => ({
    getSessionNotFoundMessage: jest.fn(() => 'missing session-1'),
  }))
  jest.unstable_mockModule('../src/parts/ListChatViewEvents/ListChatViewEvents.ts', () => ({
    listChatViewEvents: jest.fn(async () => []),
  }))
  jest.unstable_mockModule('../src/parts/ParseChatDebugUri/ParseChatDebugUri.ts', () => ({
    parseChatDebugUri: jest.fn(() => ({
      sessionId: 'session-1',
      type: 'success',
    })),
  }))

  const { loadContent } = await import('../src/parts/LoadContent/LoadContent.ts')

  const result = await loadContent({
    ...createDefaultState(),
    dataBaseVersion: 3,
    databaseName: 'db',
    eventStoreName: 'events',
    sessionIdIndexName: 'sessionId',
    uri: 'chat://debug/session-1',
  })

  expect(result).toEqual({
    ...createDefaultState(),
    dataBaseVersion: 3,
    databaseName: 'db',
    errorMessage: 'missing session-1',
    eventStoreName: 'events',
    events: [],
    initial: false,
    selectedEventIndex: null,
    sessionId: 'session-1',
    sessionIdIndexName: 'sessionId',
    uri: 'chat://debug/session-1',
  })
})

test('loadContent should return loaded events when lookup succeeds', async () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'response',
    },
  ]

  jest.unstable_mockModule('../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts', () => ({
    getFailedToLoadMessage: jest.fn(() => 'failed'),
  }))
  jest.unstable_mockModule('../src/parts/GetInvalidUriMessage/GetInvalidUriMessage.ts', () => ({
    getInvalidUriMessage: jest.fn(() => 'invalid'),
  }))
  jest.unstable_mockModule('../src/parts/GetSessionNotFoundMessage/GetSessionNotFoundMessage.ts', () => ({
    getSessionNotFoundMessage: jest.fn(() => 'missing session-1'),
  }))
  jest.unstable_mockModule('../src/parts/ListChatViewEvents/ListChatViewEvents.ts', () => ({
    listChatViewEvents: jest.fn(async () => events),
  }))
  jest.unstable_mockModule('../src/parts/ParseChatDebugUri/ParseChatDebugUri.ts', () => ({
    parseChatDebugUri: jest.fn(() => ({
      sessionId: 'session-1',
      type: 'success',
    })),
  }))

  const { loadContent } = await import('../src/parts/LoadContent/LoadContent.ts')

  const result = await loadContent({
    ...createDefaultState(),
    uri: 'chat://debug/session-1',
  })

  expect(result).toEqual({
    ...createDefaultState(),
    errorMessage: '',
    events,
    initial: false,
    selectedEventIndex: null,
    sessionId: 'session-1',
    uri: 'chat://debug/session-1',
  })
})

test('loadContent should return a failed-to-load state when listing throws', async () => {
  jest.unstable_mockModule('../src/parts/GetFailedToLoadMessage/GetFailedToLoadMessage.ts', () => ({
    getFailedToLoadMessage: jest.fn(() => 'failed session-1'),
  }))
  jest.unstable_mockModule('../src/parts/GetInvalidUriMessage/GetInvalidUriMessage.ts', () => ({
    getInvalidUriMessage: jest.fn(() => 'invalid'),
  }))
  jest.unstable_mockModule('../src/parts/GetSessionNotFoundMessage/GetSessionNotFoundMessage.ts', () => ({
    getSessionNotFoundMessage: jest.fn(() => 'missing session-1'),
  }))
  jest.unstable_mockModule('../src/parts/ListChatViewEvents/ListChatViewEvents.ts', () => ({
    listChatViewEvents: jest.fn(async () => {
      throw new Error('boom')
    }),
  }))
  jest.unstable_mockModule('../src/parts/ParseChatDebugUri/ParseChatDebugUri.ts', () => ({
    parseChatDebugUri: jest.fn(() => ({
      sessionId: 'session-1',
      type: 'success',
    })),
  }))

  const { loadContent } = await import('../src/parts/LoadContent/LoadContent.ts')

  const result = await loadContent({
    ...createDefaultState(),
    uri: 'chat://debug/session-1',
  })

  expect(result).toEqual({
    ...createDefaultState(),
    errorMessage: 'failed session-1',
    events: [],
    initial: false,
    selectedEventIndex: null,
    sessionId: 'session-1',
    uri: 'chat://debug/session-1',
  })
})

test('refresh should reload events and clear transient error state', async () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'request',
    },
  ]
  const listChatViewEvents = jest.fn(async () => events)

  jest.unstable_mockModule('../src/parts/ListChatViewEvents/ListChatViewEvents.ts', () => ({
    listChatViewEvents,
  }))

  const { refresh } = await import('../src/parts/Refresh/Refresh.ts')

  const result = await refresh({
    ...createDefaultState(),
    errorMessage: 'old error',
    initial: true,
    selectedEventIndex: 2,
    sessionId: 'session-1',
  })

  expect(listChatViewEvents).toHaveBeenCalledWith('session-1', 'lvce-chat-view-sessions', 2, 'chat-view-events', 'sessionId')
  expect(result).toEqual({
    ...createDefaultState(),
    errorMessage: '',
    events,
    initial: false,
    selectedEventIndex: null,
    sessionId: 'session-1',
  })
})

test('setSessionId should load events for the new session and update the state', async () => {
  const events = [
    {
      sessionId: 'session-2',
      timestamp: '2026-01-01T00:00:00.000Z',
      type: 'response',
    },
  ]
  const listChatViewEvents = jest.fn(async () => events)

  jest.unstable_mockModule('../src/parts/ListChatViewEvents/ListChatViewEvents.ts', () => ({
    listChatViewEvents,
  }))

  const { setSessionId } = await import('../src/parts/SetSessionId/SetSessionId.ts')

  const result = await setSessionId(createDefaultState(), 'session-2')

  expect(listChatViewEvents).toHaveBeenCalledWith('session-2', 'lvce-chat-view-sessions', 2, 'chat-view-events', 'sessionId')
  expect(result).toEqual({
    ...createDefaultState(),
    errorMessage: '',
    events,
    initial: false,
    sessionId: 'session-2',
  })
})

test('openDatabase should delegate to openDB', async () => {
  const database = {
    name: 'db',
  }
  const openDB = jest.fn(async () => database)

  jest.unstable_mockModule('idb', () => ({
    openDB,
  }))

  const { openDatabase } = await import('../src/parts/OpenDatabase/OpenDatabase.ts')

  const result = await openDatabase('db', 3)

  expect(result).toBe(database)
  expect(openDB).toHaveBeenCalledWith('db', 3)
})