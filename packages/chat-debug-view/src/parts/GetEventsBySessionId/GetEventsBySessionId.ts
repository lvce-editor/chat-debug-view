// cspell:ignore IDBP
import type { IDBPObjectStore } from 'idb'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { collapseToolExecutionEvents } from '../CollapseToolExecutionEvents/CollapseToolExecutionEvents.ts'
import { filterEventsBySessionId } from '../FilterEventsBySessionId/FilterEventsBySessionId.ts'
import { getAllEvents } from '../GetAllEvents/GetAllEvents.ts'
import { getLightweightEvent } from '../GetLightweightEvent/GetLightweightEvent.ts'

const toLightweightEvents = (events: readonly ChatViewEvent[]): readonly ChatViewEvent[] => {
  const eventsWithIds = events.map((event, index) => {
    return {
      ...event,
      eventId: index + 1,
    }
  })
  return collapseToolExecutionEvents(eventsWithIds).map((event, index) => getLightweightEvent(event, index + 1))
}

export const getEventsBySessionId = async (
  store: Pick<IDBPObjectStore, 'getAll' | 'indexNames' | 'index'>, // eslint-disable-line @typescript-eslint/prefer-readonly-parameter-types
  sessionId: string,
  sessionIdIndexName: string,
): Promise<readonly ChatViewEvent[]> => {
  if (store.indexNames.contains(sessionIdIndexName)) {
    const index = store.index(sessionIdIndexName)
    const events = await index.getAll(sessionId)

    return toLightweightEvents(filterEventsBySessionId(events as readonly ChatViewEvent[], sessionId))
  }
  const all = await getAllEvents(store)
  return toLightweightEvents(filterEventsBySessionId(all, sessionId))
}
