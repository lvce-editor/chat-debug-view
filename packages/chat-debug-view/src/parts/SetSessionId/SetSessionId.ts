import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getFailedToLoadMessage } from '../GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import * as ListChatViewEvents from '../ListChatViewEvents/ListChatViewEvents.ts'

export const setSessionIdDependencies = {
  listChatViewEvents: ListChatViewEvents.listChatViewEvents,
}

export const setSessionId = async (state: ChatDebugViewState, sessionId: string): Promise<ChatDebugViewState> => {
  const { databaseName, dataBaseVersion, eventStoreName, sessionIdIndexName } = state
  const result = await setSessionIdDependencies.listChatViewEvents(sessionId, databaseName, dataBaseVersion, eventStoreName, sessionIdIndexName)
  if (result.type === 'error') {
    return {
      ...state,
      errorMessage: getFailedToLoadMessage(sessionId, result.error),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
      sessionId,
    }
  }
  const { events } = result
  return {
    ...state,
    errorMessage: '',
    events,
    initial: false,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
    sessionId,
  }
}
