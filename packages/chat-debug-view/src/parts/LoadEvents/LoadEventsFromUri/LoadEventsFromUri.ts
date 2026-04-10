import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import { getSessionIdFromUri } from '../GetSessionIdFromUri/GetSessionIdFromUri.ts'
import { getStateWithInvalidUri } from '../GetStateWithInvalidUri/GetStateWithInvalidUri.ts'
import { loadEventsForSessionId } from '../LoadEventsForSessionId/LoadEventsForSessionId.ts'

export const loadEventsFromUri = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const sessionId = getSessionIdFromUri(state)
  if (!sessionId) {
    return getStateWithInvalidUri(state)
  }
  return loadEventsForSessionId(state, sessionId)
}