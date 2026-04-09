import type { ParseChatDebugUriResult } from '../ParseChatDebugUriResult/ParseChatDebugUriResult.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ParseChatDebugUriErrorCode } from '../ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'

const chatDebugUriPattern = /^chat-debug:\/\/([^/?#]+)$/
const invalidSessionIdPattern = /[/?#]/

export const parseChatDebugUri = (uri: string): ParseChatDebugUriResult => {
  if (!uri) {
    return {
      code: ParseChatDebugUriErrorCode.MissingUri,
      message: ChatDebugStrings.missingUri(),
      type: 'error',
    }
  }

  const match = uri.match(chatDebugUriPattern)
  if (!match) {
    return {
      code: ParseChatDebugUriErrorCode.InvalidUriFormat,
      message: ChatDebugStrings.invalidUriFormat(),
      type: 'error',
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
      type: 'error',
    }
  }

  if (!sessionId || invalidSessionIdPattern.test(sessionId)) {
    return {
      code: ParseChatDebugUriErrorCode.InvalidSessionId,
      message: ChatDebugStrings.invalidSessionId(),
      type: 'error',
    }
  }

  return {
    sessionId,
    type: 'success',
  }
}
