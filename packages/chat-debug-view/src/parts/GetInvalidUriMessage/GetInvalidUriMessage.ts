import type { ParseChatDebugUriErrorCodeType } from '../ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'
import { ParseChatDebugUriErrorCode } from '../ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'

export const getInvalidUriMessage = (uri: string, code: ParseChatDebugUriErrorCodeType): string => {
  if (code === ParseChatDebugUriErrorCode.MissingUri) {
    return 'Unable to load debug session: missing URI. Expected format: chat-debug://<sessionId>.'
  }
  return `Unable to load debug session: invalid URI "${uri}". Expected format: chat-debug://<sessionId>.`
}
