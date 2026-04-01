import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getFailedToLoadMessage } from '../GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { listChatViewEvents } from '../ListChatViewEvents/ListChatViewEvents.ts'

export const setSessionId = async (state: ChatDebugViewState, sessionId: string): Promise<ChatDebugViewState> => {
  const result = await listChatViewEvents(sessionId, state.databaseName, state.dataBaseVersion, state.eventStoreName, state.sessionIdIndexName)
  if (result.type === 'error') {
    return {
      ...state,
      errorMessage: getFailedToLoadMessage(sessionId),
      events: [],
      initial: false,
      selectedEvent: null,
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
    sessionId,
  }
}
