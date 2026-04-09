import type { ParseChatDebugUriErrorCodeType } from '../ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ParseChatDebugUriErrorCode } from '../ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'

export const getInvalidUriMessage = (uri: string, code: ParseChatDebugUriErrorCodeType): string => {
  if (code === ParseChatDebugUriErrorCode.MissingUri) {
    return ChatDebugStrings.unableToLoadDebugSessionMissingUri()
  }
  return ChatDebugStrings.unableToLoadDebugSessionInvalidUri(uri)
}
