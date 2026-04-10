export const ParseChatDebugUriErrorCode = {
  InvalidSessionId: 1,
  InvalidUriEncoding: 2,
  InvalidUriFormat: 3,
  MissingUri: 4,
} as const

export type ParseChatDebugUriErrorCodeType = (typeof ParseChatDebugUriErrorCode)[keyof typeof ParseChatDebugUriErrorCode]
