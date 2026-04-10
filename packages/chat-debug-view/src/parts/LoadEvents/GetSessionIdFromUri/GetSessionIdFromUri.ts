import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import { parseChatDebugUri } from '../../ParseChatDebugUri/ParseChatDebugUri.ts'
import { ParseChatDebugUriResultType } from '../../ParseChatDebugUriResult/ParseChatDebugUriResult.ts'

export const getSessionIdFromUri = (state: ChatDebugViewState): string | undefined => {
  const parsed = parseChatDebugUri(state.uri)
  if (parsed.type === ParseChatDebugUriResultType.Error) {
    return undefined
  }
  return parsed.sessionId
}
