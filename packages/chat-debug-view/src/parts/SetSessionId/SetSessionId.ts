import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getFailedToLoadMessage } from '../GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { getIndexedDbNotSupportedMessage } from '../GetIndexedDbNotSupportedMessage/GetIndexedDbNotSupportedMessage.ts'
import * as ListChatViewEvents from '../ListChatViewEvents/ListChatViewEvents.ts'

export const setSessionIdDependencies = {
  listChatViewEvents: ListChatViewEvents.listChatViewEvents,
}

export const setSessionId = async (state: ChatDebugViewState, sessionId: string): Promise<ChatDebugViewState> => {
  const result = await setSessionIdDependencies.listChatViewEvents(
    sessionId,
    state.databaseName,
    state.dataBaseVersion,
    state.eventStoreName,
    state.sessionIdIndexName,
    state.indexedDbSupportOverride,
  )
  if (result.type === 'not-supported') {
    return {
      ...state,
      errorMessage: getIndexedDbNotSupportedMessage(),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
      sessionId,
    }
  }
  if (result.type === 'error') {
    return {
      ...state,
      errorMessage: getFailedToLoadMessage(sessionId),
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
