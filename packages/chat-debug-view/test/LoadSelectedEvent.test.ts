import { afterEach, expect, jest, test } from '@jest/globals'
import type { getEventDetailsBySessionIdAndEventId } from '../src/parts/GetEventDetailsBySessionIdAndEventId/GetEventDetailsBySessionIdAndEventId.ts'
import type { openDatabase } from '../src/parts/OpenDatabase/OpenDatabase.ts'
import { loadSelectedEvent, loadSelectedEventDependencies } from '../src/parts/LoadSelectedEvent/LoadSelectedEvent.ts'
import { storageBackendConfig } from '../src/parts/StorageBackendConfig/StorageBackendConfig.ts'

const openDatabaseSpy = jest.spyOn(loadSelectedEventDependencies, 'openDatabase')
const getEventDetailsBySessionIdAndEventIdSpy = jest.spyOn(loadSelectedEventDependencies, 'getEventDetailsBySessionIdAndEventId')
const loadSelectedEventFromWorkerSpy = jest.spyOn(loadSelectedEventDependencies, 'loadSelectedEventFromWorker')

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
  getEventDetailsBySessionIdAndEventIdSpy.mockReset()
  loadSelectedEventFromWorkerSpy.mockReset()
  storageBackendConfig.useChatStorageWorker = false
})

test('loadSelectedEvent should use chat storage worker when configured', async () => {
  storageBackendConfig.useChatStorageWorker = true
  const event = {
    eventId: 1,
    sessionId: 'session-1',
    type: 'request',
  }
  loadSelectedEventFromWorkerSpy.mockResolvedValue(event)

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toEqual(event)
  expect(loadSelectedEventFromWorkerSpy).toHaveBeenCalledWith('session-1', 1, 'request')
  expect(openDatabaseSpy).not.toHaveBeenCalled()
  expect(getEventDetailsBySessionIdAndEventIdSpy).not.toHaveBeenCalled()
})

test('loadSelectedEvent should return null when the event store does not exist', async () => {
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
  const event = {
    eventId: 1,
    sessionId: 'session-1',
    type: 'request',
  }
  const storeWithDetails = store as unknown as Parameters<typeof getEventDetailsBySessionIdAndEventId>[0]
  openDatabaseSpy.mockResolvedValue(database)
  getEventDetailsBySessionIdAndEventIdSpy.mockResolvedValue(event)

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toEqual(event)
  expect(database.transaction).toHaveBeenCalledWith('chat-view-events', 'readonly')
  expect(transaction.objectStore).toHaveBeenCalledWith('chat-view-events')
  expect(getEventDetailsBySessionIdAndEventIdSpy).toHaveBeenCalledWith(storeWithDetails, 'session-1', 'sessionId', 1, 'request')
  expect(database.close).toHaveBeenCalledTimes(1)
})

test('loadSelectedEvent should return null when event details are missing', async () => {
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

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toBeNull()
  expect(getEventDetailsBySessionIdAndEventIdSpy).toHaveBeenCalledWith(storeWithDetails, 'session-1', 'sessionId', 1, 'request')
  expect(database.close).toHaveBeenCalledTimes(1)
})
