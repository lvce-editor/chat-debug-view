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

const createErrorResult = (code: ParseChatDebugUriErrorCode, message: string): ParseChatDebugUriError => {
  return {
    code,
    message,
    type: 'error',
  }
}

export const parseChatDebugUri = (uri: string): ParseChatDebugUriResult => {
  if (!uri) {
    return createErrorResult(ParseChatDebugUriErrorCode.MissingUri, 'Missing URI')
  }
  const match = uri.match(chatDebugUriPattern)
  if (!match) {
    return createErrorResult(ParseChatDebugUriErrorCode.InvalidUriFormat, 'Invalid URI format')
  }
  const encodedSessionId = match[1]
  let sessionId: string
  try {
    sessionId = decodeURIComponent(encodedSessionId)
  } catch {
    return createErrorResult(ParseChatDebugUriErrorCode.InvalidUriEncoding, 'Invalid URI encoding')
  }
  if (!sessionId || invalidSessionIdPattern.test(sessionId)) {
    return createErrorResult(ParseChatDebugUriErrorCode.InvalidSessionId, 'Invalid session id')
  }
  return {
    sessionId,
    type: 'success',
  }
}
