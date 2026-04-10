import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ParseChatDebugUriErrorCode } from '../ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'
import { ParseChatDebugUriResultType, type ParseChatDebugUriResult } from '../ParseChatDebugUriResult/ParseChatDebugUriResult.ts'

const chatDebugUriPattern = /^chat-debug:\/\/([^/?#]+)$/
const invalidSessionIdPattern = /[/?#]/

export const parseChatDebugUri = (uri: string): ParseChatDebugUriResult => {
  if (!uri) {
    return {
      code: ParseChatDebugUriErrorCode.MissingUri,
      message: ChatDebugStrings.missingUri(),
      type: ParseChatDebugUriResultType.Error,
    }
  }

  const match = uri.match(chatDebugUriPattern)
  if (!match) {
    return {
      code: ParseChatDebugUriErrorCode.InvalidUriFormat,
      message: ChatDebugStrings.invalidUriFormat(),
      type: ParseChatDebugUriResultType.Error,
    }
  }

  const encodedSessionId = match[1]
  let sessionId: string
  try {
    sessionId = decodeURIComponent(encodedSessionId)
  } catch {
    return {
      code: ParseChatDebugUriErrorCode.InvalidUriEncoding,
      message: ChatDebugStrings.invalidUriEncoding(),
      type: ParseChatDebugUriResultType.Error,
    }
  }

  if (!sessionId || invalidSessionIdPattern.test(sessionId)) {
    return {
      code: ParseChatDebugUriErrorCode.InvalidSessionId,
      message: ChatDebugStrings.invalidSessionId(),
      type: ParseChatDebugUriResultType.Error,
    }
  }

  return {
    sessionId,
    type: ParseChatDebugUriResultType.Success,
  }
}
