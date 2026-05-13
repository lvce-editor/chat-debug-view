import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import * as ParseChatDebugUriErrorCode from '../ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'

export const getInvalidUriMessage = (uri: string, code: number): string => {
  if (code === ParseChatDebugUriErrorCode.MissingUri) {
    return ChatDebugStrings.unableToLoadDebugSessionMissingUri()
  }
  return ChatDebugStrings.unableToLoadDebugSessionInvalidUri(uri)
}
