import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import { getInvalidUriMessage } from '../../GetInvalidUriMessage/GetInvalidUriMessage.ts'
import { parseChatDebugUri } from '../../ParseChatDebugUri/ParseChatDebugUri.ts'

export const getStateWithInvalidUri = (state: ChatDebugViewState): ChatDebugViewState => {
  const parsed = parseChatDebugUri(state.uri)
  if (parsed.type !== 'error') {
    return state
  }
  return {
    ...state,
    errorMessage: getInvalidUriMessage(state.uri, parsed.code),
    events: [],
    initial: false,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
    sessionId: '',
  }
}
