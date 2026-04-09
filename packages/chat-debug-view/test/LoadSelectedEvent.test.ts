import { afterEach, expect, jest, test } from '@jest/globals'
import { loadSelectedEvent, loadSelectedEventDependencies } from '../src/parts/LoadSelectedEvent/LoadSelectedEvent.ts'

const loadSelectedEventFromWorkerSpy = jest.spyOn(loadSelectedEventDependencies, 'loadSelectedEventFromWorker')

afterEach(() => {
  loadSelectedEventFromWorkerSpy.mockReset()
<<<<<<< HEAD
  storageBackendConfig.useChatStorageWorker = true
=======
>>>>>>> origin/main
})

test('loadSelectedEvent should use chat storage worker', async () => {
  const event = {
    eventId: 1,
    sessionId: 'session-1',
    type: 'request',
  }
  loadSelectedEventFromWorkerSpy.mockResolvedValue(event)

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toEqual(event)
  expect(loadSelectedEventFromWorkerSpy).toHaveBeenCalledWith('session-1', 1, 'request')
})

<<<<<<< HEAD
test('loadSelectedEvent should return null when the event store does not exist', async () => {
  storageBackendConfig.useChatStorageWorker = false
  const database = {
    close: jest.fn(),
    objectStoreNames: createDomStringList([]),
    transaction: jest.fn(),
  } as unknown as Awaited<ReturnType<typeof openDatabase>>
  openDatabaseSpy.mockResolvedValue(database)

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toBeNull()
  expect(openDatabaseSpy).toHaveBeenCalledWith('chat-db', 2)
  expect(database.transaction).not.toHaveBeenCalled()
  expect(getEventDetailsBySessionIdAndEventIdSpy).not.toHaveBeenCalled()
  expect(database.close).toHaveBeenCalledTimes(1)
})

test('loadSelectedEvent should return the selected event details', async () => {
  storageBackendConfig.useChatStorageWorker = false
  const store = {
    index: jest.fn(),
  }
  const transaction = {
    objectStore: jest.fn().mockReturnValue(store),
  }
  const database = {
    close: jest.fn(),
    objectStoreNames: createDomStringList(['chat-view-events']),
    transaction: jest.fn().mockReturnValue(transaction),
  } as unknown as Awaited<ReturnType<typeof openDatabase>>
=======
test('loadSelectedEvent should return the selected event details from the worker', async () => {
>>>>>>> origin/main
  const event = {
    eventId: 1,
    sessionId: 'session-1',
    type: 'request',
  }
  loadSelectedEventFromWorkerSpy.mockResolvedValue(event)

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toEqual(event)
  expect(loadSelectedEventFromWorkerSpy).toHaveBeenCalledWith('session-1', 1, 'request')
})

<<<<<<< HEAD
test('loadSelectedEvent should return null when event details are missing', async () => {
  storageBackendConfig.useChatStorageWorker = false
  const store = {
    index: jest.fn(),
  }
  const transaction = {
    objectStore: jest.fn().mockReturnValue(store),
  }
  const database = {
    close: jest.fn(),
    objectStoreNames: createDomStringList(['chat-view-events']),
    transaction: jest.fn().mockReturnValue(transaction),
  } as unknown as Awaited<ReturnType<typeof openDatabase>>
  const storeWithDetails = store as unknown as Parameters<typeof getEventDetailsBySessionIdAndEventId>[0]
  openDatabaseSpy.mockResolvedValue(database)
  getEventDetailsBySessionIdAndEventIdSpy.mockResolvedValue(undefined)
=======
test('loadSelectedEvent should return null when the worker has no details', async () => {
  loadSelectedEventFromWorkerSpy.mockResolvedValue(null)
>>>>>>> origin/main

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toBeNull()
  expect(loadSelectedEventFromWorkerSpy).toHaveBeenCalledWith('session-1', 1, 'request')
})
