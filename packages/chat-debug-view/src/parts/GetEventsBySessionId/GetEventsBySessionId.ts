import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { filterEventsBySessionId } from '../FilterEventsBySessionId/FilterEventsBySessionId.ts'
import { getAllEvents } from '../GetAllEvents/GetAllEvents.ts'
import type { IDBPObjectStore } from 'idb'

export const getEventsBySessionId = async (
  store: Pick<IDBPObjectStore, 'getAll' | 'indexNames' | 'index'>, // eslint-disable-line @typescript-eslint/prefer-readonly-parameter-types
  sessionId: string,
  sessionIdIndexName: string,
): Promise<readonly ChatViewEvent[]> => {
  if (store.indexNames.contains(sessionIdIndexName)) {
    const index = store.index(sessionIdIndexName)
    const events = await index.getAll(sessionId)
    return filterEventsBySessionId(events as readonly ChatViewEvent[], sessionId)
  }
  const all = await getAllEvents(store)
  return filterEventsBySessionId(all, sessionId)
}
