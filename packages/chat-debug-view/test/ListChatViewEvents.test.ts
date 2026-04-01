import { afterEach, expect, jest, test } from '@jest/globals'

const mockOpenDatabase = jest.fn()
const mockGetEventsBySessionId = jest.fn()

jest.unstable_mockModule('../src/parts/OpenDatabase/OpenDatabase.ts', () => {
  return {
    openDatabase: mockOpenDatabase,
  }
})

jest.unstable_mockModule('../src/parts/GetEventsBySessionId/GetEventsBySessionId.ts', () => {
  return {
    getEventsBySessionId: mockGetEventsBySessionId,
  }
})

const ListChatViewEvents = await import('../src/parts/ListChatViewEvents/ListChatViewEvents.ts')

const restoreIndexedDb = (): void => {
  if (originalIndexedDb === undefined) {
    Reflect.deleteProperty(globalThis, 'indexedDB')
    return
  }
  Object.defineProperty(globalThis, 'indexedDB', {
    configurable: true,
    value: originalIndexedDb,
    writable: true,
  })
}

const originalIndexedDb = globalThis.indexedDB

afterEach(() => {
  jest.clearAllMocks()
  restoreIndexedDb()
})

test('listChatViewEvents should return success result with events', async () => {
  Object.defineProperty(globalThis, 'indexedDB', {
    configurable: true,
    value: {},
    writable: true,
  })
  const store = {
    index: jest.fn(),
    indexNames: {
      contains: jest.fn(),
    },
  }
  const transaction = {
    objectStore: jest.fn().mockReturnValue(store),
  }
  const database = {
    close: jest.fn(),
    objectStoreNames: {
      contains: jest.fn().mockReturnValue(true),
    },
    transaction: jest.fn().mockReturnValue(transaction),
  }
  const events = [
    {
      duration: 0,
      endTime: '2026-03-08T00:00:00.000Z',
      eventId: 1,
      startTime: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  mockOpenDatabase.mockResolvedValue(database)
  mockGetEventsBySessionId.mockResolvedValue(events)

  const result = await ListChatViewEvents.listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    events,
    type: 'success',
  })
  expect(mockOpenDatabase).toHaveBeenCalledWith('chat-db', 2)
  expect(database.transaction).toHaveBeenCalledWith('chat-view-events', 'readonly')
  expect(transaction.objectStore).toHaveBeenCalledWith('chat-view-events')
  expect(mockGetEventsBySessionId).toHaveBeenCalledWith(store, 'session-1', 'sessionId')
  expect(database.close).toHaveBeenCalledTimes(1)
})

test('listChatViewEvents should return error result when opening the database fails', async () => {
  Object.defineProperty(globalThis, 'indexedDB', {
    configurable: true,
    value: {},
    writable: true,
  })
  const error = new Error('failed to open database')
  mockOpenDatabase.mockRejectedValue(error)

  const result = await ListChatViewEvents.listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    error,
    type: 'error',
  })
})
