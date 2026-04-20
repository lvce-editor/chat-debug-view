import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { collapseToolExecutionEvents } from '../CollapseToolExecutionEvents/CollapseToolExecutionEvents.ts'
import { getCombinedEvents } from '../GetCombinedEvents/GetCombinedEvents.ts'

export const loadSelectedEvent = async (
  _databaseName: string,
  _dataBaseVersion: number,
  _eventStoreName: string,
  sessionId: string,
  _sessionIdIndexName: string,
  eventId: number,
  type: string,
): Promise<ChatViewEvent | null> => {
  const events = await getCombinedEvents(sessionId)
  const collapsedEvents = collapseToolExecutionEvents(events)
  const event = collapsedEvents.find((candidate) => candidate.eventId === eventId && candidate.type === type)
  return event || null
}
