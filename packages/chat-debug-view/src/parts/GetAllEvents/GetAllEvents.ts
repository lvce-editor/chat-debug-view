// cspell:ignore IDBP
import type { IDBPObjectStore } from 'idb'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const getAllEvents = async (store: Pick<IDBPObjectStore, 'getAll'>): Promise<readonly ChatViewEvent[]> => {
  const all = await store.getAll()
  return all as readonly ChatViewEvent[]
}
