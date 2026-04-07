/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */

import * as Idb from 'idb'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

const DefaultDatabaseName = 'lvce-chat-view-sessions'
const DefaultDatabaseVersion = 2
const DefaultEventStoreName = 'chat-view-events'
const DefaultSessionStoreName = 'chat-sessions'
const DefaultSessionIdIndexName = 'sessionId'
const SeedBatchSize = 5000
const BaseTimestamp = Date.parse('2026-03-08T00:00:00.000Z')

export const seedManyEventsInIndexedDbForTestDependencies = {
  openDB: Idb.openDB,
}

interface UpgradeDatabaseLike {
  createObjectStore: (
    name: string,
    options?: IDBObjectStoreParameters,
  ) => {
    createIndex: (name: string, keyPath: string | string[], options?: IDBIndexParameters) => unknown
    readonly indexNames: DOMStringList
  }
  readonly objectStoreNames: DOMStringList
}

interface UpgradeTransactionLike {
  objectStore: (name: string) => {
    createIndex: (name: string, keyPath: string | string[], options?: IDBIndexParameters) => unknown
    readonly indexNames: DOMStringList
  }
}

interface EventStoreLike {
  add: (value: unknown) => Promise<unknown>
  delete: (query: IDBValidKey | IDBKeyRange) => Promise<void>
  index: (name: string) => {
    getAllKeys: (query?: IDBValidKey | IDBKeyRange | null, count?: number) => Promise<readonly IDBValidKey[]>
  }
  readonly indexNames: DOMStringList
}

interface SummaryStoreLike {
  put: (value: unknown) => Promise<unknown>
}

interface SeedManyEventsInIndexedDbForTestOptions {
  readonly databaseName?: string
  readonly databaseVersion?: number
  readonly eventStoreName?: string
  readonly sessionId: string
  readonly sessionIdIndexName?: string
  readonly sessionStoreName?: string
  readonly totalEventCount: number | string
}

const toTimestamp = (offsetMs: number): string => {
  return new Date(BaseTimestamp + offsetMs).toISOString()
}

const createVisibleEvent = (sessionId: string): ChatViewEvent => {
  return {
    ended: toTimestamp(100),
    sessionId,
    started: toTimestamp(0),
    timestamp: toTimestamp(0),
    type: 'request',
  }
}

const createHiddenEvent = (sessionId: string, index: number): ChatViewEvent => {
  return {
    sessionId,
    timestamp: toTimestamp(index + 1),
    type: 'sse-response-part',
    value: {
      index,
      type: 'response.output_text.delta',
    },
  }
}

const ensureStores = (
  database: UpgradeDatabaseLike,
  transaction: UpgradeTransactionLike | undefined,
  sessionStoreName: string,
  eventStoreName: string,
  sessionIdIndexName: string,
): void => {
  if (!database.objectStoreNames.contains(sessionStoreName)) {
    database.createObjectStore(sessionStoreName, {
      keyPath: 'id',
    })
  }
  if (database.objectStoreNames.contains(eventStoreName)) {
    const eventStore = transaction?.objectStore(eventStoreName)
    if (eventStore && !eventStore.indexNames.contains(sessionIdIndexName)) {
      eventStore.createIndex(sessionIdIndexName, sessionIdIndexName, {
        unique: false,
      })
    }
    return
  }
  const eventStore = database.createObjectStore(eventStoreName, {
    autoIncrement: true,
    keyPath: 'eventId',
  })
  eventStore.createIndex(sessionIdIndexName, sessionIdIndexName, {
    unique: false,
  })
}

const deleteExistingSessionEvents = async (eventStore: EventStoreLike, sessionId: string, sessionIdIndexName: string): Promise<void> => {
  if (!eventStore.indexNames.contains(sessionIdIndexName)) {
    return
  }
  const index = eventStore.index(sessionIdIndexName)
  const keys = await index.getAllKeys(sessionId)
  for (let i = 0; i < keys.length; i += SeedBatchSize) {
    const batch = keys.slice(i, i + SeedBatchSize)
    await Promise.all(batch.map((key) => eventStore.delete(key)))
  }
}

const addSeedEvents = async (eventStore: EventStoreLike, sessionId: string, totalEventCount: number): Promise<void> => {
  const pendingAdds: Promise<unknown>[] = []
  for (let i = 0; i < totalEventCount; i++) {
    const event = i === 0 ? createVisibleEvent(sessionId) : createHiddenEvent(sessionId, i)
    pendingAdds.push(eventStore.add(event))
    if (pendingAdds.length === SeedBatchSize) {
      await Promise.all(pendingAdds)
      pendingAdds.length = 0
    }
  }
  if (pendingAdds.length > 0) {
    await Promise.all(pendingAdds)
  }
}

const getSeedOptions = (
  optionsOrUid: number | SeedManyEventsInIndexedDbForTestOptions,
  maybeOptions?: SeedManyEventsInIndexedDbForTestOptions,
): SeedManyEventsInIndexedDbForTestOptions => {
  if (typeof optionsOrUid === 'number') {
    return (
      maybeOptions ?? {
        sessionId: '',
        totalEventCount: Number.NaN,
      }
    )
  }
  return optionsOrUid
}

export const seedManyEventsInIndexedDbForTest = async (
  optionsOrUid: number | SeedManyEventsInIndexedDbForTestOptions,
  maybeOptions?: SeedManyEventsInIndexedDbForTestOptions,
): Promise<void> => {
  const options = getSeedOptions(optionsOrUid, maybeOptions)
  const {
    databaseName: customDatabaseName,
    databaseVersion: customDatabaseVersion,
    eventStoreName: customEventStoreName,
    sessionId,
    sessionIdIndexName: customSessionIdIndexName,
    sessionStoreName: customSessionStoreName,
    totalEventCount,
  } = options
  const parsedEventCount = typeof totalEventCount === 'number' || typeof totalEventCount === 'string' ? Number(totalEventCount) : Number.NaN
  const databaseName = customDatabaseName ?? DefaultDatabaseName
  const databaseVersion = customDatabaseVersion ?? DefaultDatabaseVersion
  const eventStoreName = customEventStoreName ?? DefaultEventStoreName
  const sessionStoreName = customSessionStoreName ?? DefaultSessionStoreName
  const sessionIdIndexName = customSessionIdIndexName ?? DefaultSessionIdIndexName
  if (!sessionId) {
    throw new Error('sessionId must not be empty')
  }
  if (!Number.isInteger(parsedEventCount) || parsedEventCount < 1) {
    throw new Error('totalEventCount must be a positive integer')
  }

  const database = await seedManyEventsInIndexedDbForTestDependencies.openDB(databaseName, databaseVersion, {
    upgrade: (db, _oldVersion, _newVersion, transaction) => {
      ensureStores(db, transaction, sessionStoreName, eventStoreName, sessionIdIndexName)
    },
  })

  try {
    const transaction = database.transaction([sessionStoreName, eventStoreName], 'readwrite')
    const summaryStore = transaction.objectStore(sessionStoreName) as SummaryStoreLike
    const eventStore = transaction.objectStore(eventStoreName) as EventStoreLike
    await deleteExistingSessionEvents(eventStore, sessionId, sessionIdIndexName)
    await summaryStore.put({
      id: sessionId,
      title: `seeded ${parsedEventCount} events`,
    })
    await addSeedEvents(eventStore, sessionId, parsedEventCount)
    await transaction.done
  } finally {
    database.close()
  }
}
