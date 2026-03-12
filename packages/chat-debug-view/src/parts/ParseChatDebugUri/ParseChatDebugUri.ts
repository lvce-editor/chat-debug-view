const chatDebugUriPattern = /^chat-debug:\/\/([^/?#]+)$/
const invalidSessionIdPattern = /[/?#]/

export const ParseChatDebugUriErrorCode = {
  InvalidSessionId: 'invalid-session-id',
  InvalidUriEncoding: 'invalid-uri-encoding',
  InvalidUriFormat: 'invalid-uri-format',
  MissingUri: 'missing-uri',
} as const

export type ParseChatDebugUriErrorCode = (typeof ParseChatDebugUriErrorCode)[keyof typeof ParseChatDebugUriErrorCode]

export type ParseChatDebugUriSuccess = {
  readonly type: 'success'
  readonly sessionId: string
}

export type ParseChatDebugUriError = {
  readonly type: 'error'
  readonly code: ParseChatDebugUriErrorCode
  readonly message: string
}

export type ParseChatDebugUriResult = ParseChatDebugUriSuccess | ParseChatDebugUriError

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
