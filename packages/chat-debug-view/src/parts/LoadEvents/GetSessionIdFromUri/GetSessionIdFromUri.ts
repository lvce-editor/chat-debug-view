import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import { parseChatDebugUri } from '../../ParseChatDebugUri/ParseChatDebugUri.ts'

export const getSessionIdFromUri = (state: ChatDebugViewState): string | undefined => {
  const parsed = parseChatDebugUri(state.uri)
  if (parsed.type === 'error') {
    return undefined
  }
  return parsed.sessionId
}