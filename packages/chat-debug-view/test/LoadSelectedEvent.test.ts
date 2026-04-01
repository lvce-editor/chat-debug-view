import { afterEach, expect, jest, test } from '@jest/globals'

const mockOpenDatabase = jest.fn()
const mockGetEventDetailsBySessionIdAndEventId = jest.fn()

jest.unstable_mockModule('../src/parts/OpenDatabase/OpenDatabase.ts', () => {
  return {
    openDatabase: mockOpenDatabase,
  }
})

jest.unstable_mockModule('../src/parts/GetEventDetailsBySessionIdAndEventId/GetEventDetailsBySessionIdAndEventId.ts', () => {
  return {
    getEventDetailsBySessionIdAndEventId: mockGetEventDetailsBySessionIdAndEventId,
  }
})

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
  mockOpenDatabase.mockReset()
  mockGetEventDetailsBySessionIdAndEventId.mockReset()
  jest.resetModules()
})

test('loadSelectedEvent should return null when the event store does not exist', async () => {
  const database = {
    close: jest.fn(),
    objectStoreNames: createDomStringList([]),
    transaction: jest.fn(),
  }
  mockOpenDatabase.mockResolvedValue(database)
  const { loadSelectedEvent } = await import('../src/parts/LoadSelectedEvent/LoadSelectedEvent.ts')

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toBeNull()
  expect(mockOpenDatabase).toHaveBeenCalledWith('chat-db', 2)
  expect(database.transaction).not.toHaveBeenCalled()
  expect(mockGetEventDetailsBySessionIdAndEventId).not.toHaveBeenCalled()
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
  }
  const event = {
    eventId: 1,
    sessionId: 'session-1',
    type: 'request',
  }
  mockOpenDatabase.mockResolvedValue(database)
  mockGetEventDetailsBySessionIdAndEventId.mockResolvedValue(event)
  const { loadSelectedEvent } = await import('../src/parts/LoadSelectedEvent/LoadSelectedEvent.ts')

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toEqual(event)
  expect(database.transaction).toHaveBeenCalledWith('chat-view-events', 'readonly')
  expect(transaction.objectStore).toHaveBeenCalledWith('chat-view-events')
  expect(mockGetEventDetailsBySessionIdAndEventId).toHaveBeenCalledWith(store, 'session-1', 'sessionId', 1, 'request')
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
  }
  mockOpenDatabase.mockResolvedValue(database)
  mockGetEventDetailsBySessionIdAndEventId.mockResolvedValue(undefined)
  const { loadSelectedEvent } = await import('../src/parts/LoadSelectedEvent/LoadSelectedEvent.ts')

  const result = await loadSelectedEvent('chat-db', 2, 'chat-view-events', 'session-1', 'sessionId', 1, 'request')

  expect(result).toBeNull()
  expect(mockGetEventDetailsBySessionIdAndEventId).toHaveBeenCalledWith(store, 'session-1', 'sessionId', 1, 'request')
  expect(database.close).toHaveBeenCalledTimes(1)
})
