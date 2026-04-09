import { afterEach, expect, jest, test } from '@jest/globals'
import { listChatViewEvents, listChatViewEventsDependencies } from '../src/parts/ListChatViewEvents/ListChatViewEvents.ts'

const listChatViewEventsFromWorkerSpy = jest.spyOn(listChatViewEventsDependencies, 'listChatViewEventsFromWorker')

afterEach(() => {
  listChatViewEventsFromWorkerSpy.mockReset()
<<<<<<< HEAD
  setIndexedDbSupportForTest(undefined)
  storageBackendConfig.useChatStorageWorker = true
=======
>>>>>>> origin/main
})

test('listChatViewEvents should use chat storage worker', async () => {
  const events = [
    {
      duration: 0,
      endTime: '2026-03-08T00:00:00.000Z',
      eventId: 1,
      startTime: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  listChatViewEventsFromWorkerSpy.mockResolvedValue({
    events,
    type: 'success',
  })

  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    events,
    type: 'success',
  })
  expect(listChatViewEventsFromWorkerSpy).toHaveBeenCalledWith('session-1')
})

test('listChatViewEvents should return error when chat storage worker loading fails', async () => {
  const error = new Error('worker failed')
  listChatViewEventsFromWorkerSpy.mockRejectedValue(error)

  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    error,
    type: 'error',
  })
  expect(listChatViewEventsFromWorkerSpy).toHaveBeenCalledWith('session-1')
<<<<<<< HEAD
  expect(openDatabaseSpy).not.toHaveBeenCalled()
})

test('listChatViewEvents should return not-supported when IndexedDB is unavailable', async () => {
  storageBackendConfig.useChatStorageWorker = false
  setIndexedDbSupportForTest(false)
  const result = await listChatViewEvents('session-1', 'chat-db', 2, 'chat-view-events', 'sessionId')

  expect(result).toEqual({
    type: 'not-supported',
  })
  expect(openDatabaseSpy).not.toHaveBeenCalled()
})

test('listChatViewEvents should return success result with events', async () => {
  storageBackendConfig.useChatStorageWorker = false
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
  storageBackendConfig.useChatStorageWorker = false
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
  storageBackendConfig.useChatStorageWorker = false
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
  storageBackendConfig.useChatStorageWorker = false
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
=======
>>>>>>> origin/main
})
