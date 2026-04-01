import { afterEach, expect, jest, test } from '@jest/globals'
import { getEventsBySessionId } from '../src/parts/GetEventsBySessionId/GetEventsBySessionId.ts'
import { listChatViewEvents, listChatViewEventsDependencies } from '../src/parts/ListChatViewEvents/ListChatViewEvents.ts'
import { openDatabase } from '../src/parts/OpenDatabase/OpenDatabase.ts'
import { setIndexedDbSupportForTest } from '../src/parts/SetIndexedDbSupportForTest/SetIndexedDbSupportForTest.ts'

const openDatabaseSpy = jest.spyOn(listChatViewEventsDependencies, 'openDatabase')
const getEventsBySessionIdSpy = jest.spyOn(listChatViewEventsDependencies, 'getEventsBySessionId')

const createDomStringList = (values: readonly string[]): DOMStringList => {
  return {
    contains: (value: string): boolean => values.includes(value),
    item: (index: number): string | null => values[index] ?? null,
    length: values.length,
    *[Symbol.iterator](): IterableIterator<string> {
      yield* values
    },
  } as unknown as DOMStringList
}

afterEach(() => {
  openDatabaseSpy.mockReset()
  getEventsBySessionIdSpy.mockReset()
  setIndexedDbSupportForTest(undefined)
})

test('listChatViewEvents should return not-supported when IndexedDB is unavailable', async () => {
  setIndexedDbSupportForTest(false)
  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    type: 'not-supported',
  })
  expect(openDatabaseSpy).not.toHaveBeenCalled()
})

test('listChatViewEvents should return success result with events', async () => {
  setIndexedDbSupportForTest(true)
  const store = {
    getAll: jest.fn(),
    index: jest.fn(),
    indexNames: createDomStringList([]),
  } as unknown as Parameters<typeof getEventsBySessionId>[0]
  const transaction = {
    objectStore: jest.fn().mockReturnValue(store),
  }
  const database = {
    close: jest.fn(),
    objectStoreNames: createDomStringList(['chat-view-events']),
    transaction: jest.fn().mockReturnValue(transaction),
  } as unknown as Awaited<ReturnType<typeof openDatabase>>
  const events = [
    {
      duration: 0,
      endTime: '2026-03-08T00:00:00.000Z',
      eventId: 1,
      startTime: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  openDatabaseSpy.mockResolvedValue(database)
  getEventsBySessionIdSpy.mockResolvedValue(events)

  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    events,
    type: 'success',
  })
  expect(openDatabaseSpy).toHaveBeenCalledWith('chat-db', 2)
  expect(database.transaction).toHaveBeenCalledWith('chat-view-events', 'readonly')
  expect(transaction.objectStore).toHaveBeenCalledWith('chat-view-events')
  expect(getEventsBySessionIdSpy).toHaveBeenCalledWith(store, 'session-1', 'sessionId')
  expect(database.close).toHaveBeenCalledTimes(1)
})

test('listChatViewEvents should return error result when opening the database fails', async () => {
  setIndexedDbSupportForTest(true)
  const error = new Error('failed to open database')
  openDatabaseSpy.mockRejectedValue(error)

  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    error,
    type: 'error',
  })
})

test('listChatViewEvents should return success with empty events when store is missing', async () => {
  setIndexedDbSupportForTest(true)
  const database = {
    close: jest.fn(),
    objectStoreNames: createDomStringList([]),
    transaction: jest.fn(),
  } as unknown as Awaited<ReturnType<typeof openDatabase>>
  openDatabaseSpy.mockResolvedValue(database)

  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    events: [],
    type: 'success',
  })
  expect(database.transaction).not.toHaveBeenCalled()
  expect(getEventsBySessionIdSpy).not.toHaveBeenCalled()
  expect(database.close).toHaveBeenCalledTimes(1)
})

test('listChatViewEvents should return success with empty events when session id is empty', async () => {
  setIndexedDbSupportForTest(true)
  const store = {
    getAll: jest.fn(),
    index: jest.fn(),
    indexNames: createDomStringList([]),
  } as unknown as Parameters<typeof getEventsBySessionId>[0]
  const transaction = {
    objectStore: jest.fn().mockReturnValue(store),
  }
  const database = {
    close: jest.fn(),
    objectStoreNames: createDomStringList(['chat-view-events']),
    transaction: jest.fn().mockReturnValue(transaction),
  } as unknown as Awaited<ReturnType<typeof openDatabase>>
  openDatabaseSpy.mockResolvedValue(database)

  const result = await listChatViewEvents('', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    events: [],
    type: 'success',
  })
  expect(transaction.objectStore).toHaveBeenCalledWith('chat-view-events')
  expect(getEventsBySessionIdSpy).not.toHaveBeenCalled()
  expect(database.close).toHaveBeenCalledTimes(1)
})
