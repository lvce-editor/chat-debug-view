import { afterEach, expect, jest, test } from '@jest/globals'
import {
  seedManyEventsInIndexedDbForTest,
  seedManyEventsInIndexedDbForTestDependencies,
} from '../src/parts/SeedManyEventsInIndexedDbForTest/SeedManyEventsInIndexedDbForTest.ts'

const openDBSpy = jest.spyOn(seedManyEventsInIndexedDbForTestDependencies, 'openDB')

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
  openDBSpy.mockReset()
})

test('seedManyEventsInIndexedDbForTest should reject empty session ids', async () => {
  await expect(seedManyEventsInIndexedDbForTest('', 1)).rejects.toThrow('sessionId must not be empty')
  expect(openDBSpy).not.toHaveBeenCalled()
})

test('seedManyEventsInIndexedDbForTest should reject invalid event counts', async () => {
  await expect(seedManyEventsInIndexedDbForTest('session-1', 0)).rejects.toThrow('totalEventCount must be a positive integer')
  expect(openDBSpy).not.toHaveBeenCalled()
})

test('seedManyEventsInIndexedDbForTest should replace events for the session and add one visible event plus hidden remainder', async () => {
  const done = new Promise<void>((resolve) => {
    resolve()
  })
  const index = {
    getAllKeys: jest.fn().mockResolvedValue([41, 42]),
  }
  const eventStore = {
    add: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
    index: jest.fn().mockReturnValue(index),
    indexNames: createDomStringList(['sessionId']),
  }
  const summaryStore = {
    put: jest.fn().mockResolvedValue(undefined),
  }
  const transaction = {
    done,
    objectStore: jest.fn((name: string) => {
      if (name === 'chat-view-events') {
        return eventStore
      }
      return summaryStore
    }),
  }
  const database = {
    close: jest.fn(),
    transaction: jest.fn().mockReturnValue(transaction),
  }

  openDBSpy.mockResolvedValue(database as never)

  await seedManyEventsInIndexedDbForTest('session-1', 3, 'chat-db', 2, 'chat-view-events', 'chat-sessions')

  expect(openDBSpy).toHaveBeenCalledWith(
    'chat-db',
    2,
    expect.objectContaining({
      upgrade: expect.any(Function),
    }),
  )
  expect(database.transaction).toHaveBeenCalledWith(['chat-sessions', 'chat-view-events'], 'readwrite')
  expect(index.getAllKeys).toHaveBeenCalledWith('session-1')
  expect(eventStore.delete).toHaveBeenCalledTimes(2)
  expect(summaryStore.put).toHaveBeenCalledWith({
    id: 'session-1',
    title: 'seeded 3 events',
  })
  expect(eventStore.add).toHaveBeenCalledTimes(3)
  expect(eventStore.add).toHaveBeenNthCalledWith(1, {
    ended: '2026-03-08T00:00:00.100Z',
    sessionId: 'session-1',
    started: '2026-03-08T00:00:00.000Z',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  })
  expect(eventStore.add).toHaveBeenNthCalledWith(2, {
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.002Z',
    type: 'sse-response-part',
    value: {
      index: 1,
      type: 'response.output_text.delta',
    },
  })
  expect(eventStore.add).toHaveBeenNthCalledWith(3, {
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.003Z',
    type: 'sse-response-part',
    value: {
      index: 2,
      type: 'response.output_text.delta',
    },
  })
  expect(database.close).toHaveBeenCalledTimes(1)
})
