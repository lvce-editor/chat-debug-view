export const ParseChatDebugUriErrorCode = {
  InvalidSessionId: 'invalid-session-id',
  InvalidUriEncoding: 'invalid-uri-encoding',
  InvalidUriFormat: 'invalid-uri-format',
  MissingUri: 'missing-uri',
} as const

export type ParseChatDebugUriErrorCodeType = (typeof ParseChatDebugUriErrorCode)[keyof typeof ParseChatDebugUriErrorCode]
