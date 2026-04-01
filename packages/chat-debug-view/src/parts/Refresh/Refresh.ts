import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getFailedToLoadMessage } from '../GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { getIndexedDbNotSupportedMessage } from '../GetIndexedDbNotSupportedMessage/GetIndexedDbNotSupportedMessage.ts'
import { listChatViewEvents } from '../ListChatViewEvents/ListChatViewEvents.ts'

export const refresh = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const result = await listChatViewEvents(state.sessionId, state.databaseName, state.dataBaseVersion, state.eventStoreName, state.sessionIdIndexName)
  if (result.type === 'error') {
    return {
      ...state,
      errorMessage: getFailedToLoadMessage(state.sessionId),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventIndex: null,
    }
  }
  if (result.type === 'not-supported') {
    return {
      ...state,
      errorMessage: getIndexedDbNotSupportedMessage(),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventIndex: null,
    }
  }
  const { events } = result
  return {
    ...state,
    errorMessage: '',
    events,
    initial: false,
    selectedEvent: null,
    selectedEventIndex: null,
  }
}
