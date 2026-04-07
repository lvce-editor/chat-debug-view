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
  await expect(
    seedManyEventsInIndexedDbForTest({
      sessionId: '',
      totalEventCount: 1,
    }),
  ).rejects.toThrow('sessionId must not be empty')
  expect(openDBSpy).not.toHaveBeenCalled()
})

test('seedManyEventsInIndexedDbForTest should reject invalid event counts', async () => {
  await expect(
    seedManyEventsInIndexedDbForTest({
      sessionId: 'session-1',
      totalEventCount: 0,
    }),
  ).rejects.toThrow('totalEventCount must be a positive integer')
  expect(openDBSpy).not.toHaveBeenCalled()
})

test('seedManyEventsInIndexedDbForTest should replace events for the session and add one visible event plus hidden remainder', async () => {
  const done = new Promise<void>((resolve) => {
    resolve()
  })
  const getAllKeys = jest.fn(async (_sessionId: string) => [41, 42])
  const add = jest.fn(async (_value: unknown) => undefined)
  const remove = jest.fn(async (_query: unknown) => undefined)
  const put = jest.fn(async (_value: unknown) => undefined)
  const index = {
    getAllKeys,
  }
  const eventStore = {
    add,
    delete: remove,
    index: jest.fn().mockReturnValue(index),
    indexNames: createDomStringList(['sessionId']),
  }
  const summaryStore = {
    put,
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

  await seedManyEventsInIndexedDbForTest({
    databaseName: 'chat-db',
    databaseVersion: 2,
    eventStoreName: 'chat-view-events',
    sessionId: 'session-1',
    sessionStoreName: 'chat-sessions',
    totalEventCount: 3,
  })

  expect(openDBSpy).toHaveBeenCalledWith(
    'chat-db',
    2,
    expect.objectContaining({
      upgrade: expect.any(Function),
    }),
  )
  expect(database.transaction).toHaveBeenCalledWith(['chat-sessions', 'chat-view-events'], 'readwrite')
  expect(getAllKeys).toHaveBeenCalledWith('session-1')
  expect(remove).toHaveBeenCalledTimes(2)
  expect(put).toHaveBeenCalledWith({
    id: 'session-1',
    title: 'seeded 3 events',
  })
  expect(add).toHaveBeenCalledTimes(3)
  expect(add).toHaveBeenNthCalledWith(1, {
    ended: '2026-03-08T00:00:00.100Z',
    sessionId: 'session-1',
    started: '2026-03-08T00:00:00.000Z',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  })
  expect(add).toHaveBeenNthCalledWith(2, {
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.002Z',
    type: 'sse-response-part',
    value: {
      index: 1,
      type: 'response.output_text.delta',
    },
  })
  expect(add).toHaveBeenNthCalledWith(3, {
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

test('seedManyEventsInIndexedDbForTest should accept a prepended uid before the options object', async () => {
  const done = new Promise<void>((resolve) => {
    resolve()
  })
  const database = {
    close: jest.fn(),
    transaction: jest.fn().mockReturnValue({
      done,
      objectStore: jest.fn().mockReturnValue({
        add: jest.fn(async (_value: unknown) => undefined),
        delete: jest.fn(async (_query: unknown) => undefined),
        index: jest.fn().mockReturnValue({
          getAllKeys: jest.fn(async (_sessionId: string) => []),
        }),
        indexNames: createDomStringList(['sessionId']),
        put: jest.fn(async (_value: unknown) => undefined),
      }),
    }),
  }
  openDBSpy.mockResolvedValue(database as never)

  await seedManyEventsInIndexedDbForTest(42, {
    sessionId: 'session-2',
    totalEventCount: '1',
  })

  expect(openDBSpy).toHaveBeenCalledTimes(1)
  expect(database.close).toHaveBeenCalledTimes(1)
})
