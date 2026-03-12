import type { ParseChatDebugUriResult } from '../ParseChatDebugUriResult/ParseChatDebugUriResult.ts'
import { ParseChatDebugUriErrorCode } from '../ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'

const chatDebugUriPattern = /^chat-debug:\/\/([^/?#]+)$/
const invalidSessionIdPattern = /[/?#]/

export const parseChatDebugUri = (uri: string): ParseChatDebugUriResult => {
  if (!uri) {
    return {
      code: ParseChatDebugUriErrorCode.MissingUri,
      message: 'Missing URI',
      type: 'error',
    }
  }

  const match = uri.match(chatDebugUriPattern)
  if (!match) {
    return {
      code: ParseChatDebugUriErrorCode.InvalidUriFormat,
      message: 'Invalid URI format',
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
      message: 'Invalid URI encoding',
      type: 'error',
    }
  }

  if (!sessionId || invalidSessionIdPattern.test(sessionId)) {
    return {
      code: ParseChatDebugUriErrorCode.InvalidSessionId,
      message: 'Invalid session id',
      type: 'error',
    }
  }

  return {
    sessionId,
    type: 'success',
  }
}
