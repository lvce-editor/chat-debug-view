import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { listChatViewEvents } from '../ListChatViewEvents/ListChatViewEvents.ts'
import { parseChatDebugUri } from '../ParseChatDebugUri/ParseChatDebugUri.ts'

const getInvalidUriMessage = (uri: string, code: ParseChatDebugUriErrorCodeType): string => {
  if (code === ParseChatDebugUriErrorCode.MissingUri) {
    return 'Unable to load debug session: missing URI. Expected format: chat-debug://<sessionId>.'
  }
  return `Unable to load debug session: invalid URI "${uri}". Expected format: chat-debug://<sessionId>.`
}

const getSessionNotFoundMessage = (sessionId: string): string => {
  return `No chat session found for sessionId "${sessionId}".`
}

const getFailedToLoadMessage = (sessionId: string): string => {
  return `Failed to load chat debug session "${sessionId}". Please try again.`
}

export const loadContent = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const { databaseName, dataBaseVersion, eventStoreName, sessionIdIndexName, uri } = state
  const parsed = parseChatDebugUri(uri)
  if (parsed.type === 'error') {
    return {
      ...state,
      errorMessage: getInvalidUriMessage(uri, parsed.code),
      events: [],
      initial: false,
      sessionId: '',
    }
  }
  const { sessionId } = parsed

  try {
    const events = await listChatViewEvents(sessionId, databaseName, dataBaseVersion, eventStoreName, sessionIdIndexName)
    if (events.length === 0) {
      return {
        ...state,
        errorMessage: getSessionNotFoundMessage(sessionId),
        events: [],
        initial: false,
        sessionId,
      }
    }
    return {
      ...state,
      errorMessage: '',
      events,
      initial: false,
      sessionId,
    }
  } catch {
    return {
      ...state,
      errorMessage: getFailedToLoadMessage(sessionId),
      events: [],
      initial: false,
      sessionId,
    }
  }
}
