import { afterEach, expect, jest, test } from '@jest/globals'
import { setIndexedDbSupportForTest } from '../src/parts/SetIndexedDbSupportForTest/SetIndexedDbSupportForTest.ts'

const mockOpenDatabase = jest.fn<() => Promise<any>>()
const mockGetEventsBySessionId = jest.fn<() => Promise<any>>()

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

afterEach(() => {
  jest.clearAllMocks()
  setIndexedDbSupportForTest(undefined)
})

test('listChatViewEvents should return not-supported when IndexedDB is unavailable', async () => {
  setIndexedDbSupportForTest(false)
  const result = await ListChatViewEvents.listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    type: 'not-supported',
  })
  expect(mockOpenDatabase).not.toHaveBeenCalled()
})

test('listChatViewEvents should return success result with events', async () => {
  setIndexedDbSupportForTest(true)
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
  setIndexedDbSupportForTest(true)
  const error = new Error('failed to open database')
  mockOpenDatabase.mockRejectedValue(error)

  const result = await ListChatViewEvents.listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    error,
    type: 'error',
  })
})
