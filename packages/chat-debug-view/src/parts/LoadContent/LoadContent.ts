import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getFailedToLoadMessage } from '../GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { getIndexedDbNotSupportedMessage } from '../GetIndexedDbNotSupportedMessage/GetIndexedDbNotSupportedMessage.ts'
import { getInvalidUriMessage } from '../GetInvalidUriMessage/GetInvalidUriMessage.ts'
import { getSessionNotFoundMessage } from '../GetSessionNotFoundMessage/GetSessionNotFoundMessage.ts'
import * as ListChatViewEvents from '../ListChatViewEvents/ListChatViewEvents.ts'
import { parseChatDebugUri } from '../ParseChatDebugUri/ParseChatDebugUri.ts'

export const loadContent = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const { databaseName, dataBaseVersion, eventStoreName, indexedDbSupportOverride, sessionIdIndexName, uri } = state
  const parsed = parseChatDebugUri(uri)
  if (parsed.type === 'error') {
    return {
      ...state,
      errorMessage: getInvalidUriMessage(uri, parsed.code),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventIndex: null,
      sessionId: '',
    }
  }
  const { sessionId } = parsed

  const result = await ListChatViewEvents.listChatViewEvents(
    sessionId,
    databaseName,
    dataBaseVersion,
    eventStoreName,
    sessionIdIndexName,
    indexedDbSupportOverride,
  )
  if (result.type === 'not-supported') {
    return {
      ...state,
      errorMessage: getIndexedDbNotSupportedMessage(),
      events: [],
      initial: false,
      selectedEvent: null,
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
      selectedEventIndex: null,
      sessionId,
    }
  }

  const { events } = result
  if (events.length === 0) {
    return {
      ...state,
      errorMessage: getSessionNotFoundMessage(sessionId),
      events: [],
      initial: false,
      selectedEvent: null,
      selectedEventIndex: null,
      sessionId,
    }
  }

  return {
    ...state,
    errorMessage: '',
    events,
    initial: false,
    selectedEvent: null,
    selectedEventIndex: null,
    sessionId,
  }
}
