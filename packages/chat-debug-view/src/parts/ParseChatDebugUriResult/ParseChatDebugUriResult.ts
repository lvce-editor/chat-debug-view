export const ParseChatDebugUriResultType = {
  Error: 2,
  Success: 1,
} as const

export type ParseChatDebugUriResultType = (typeof ParseChatDebugUriResultType)[keyof typeof ParseChatDebugUriResultType]

export type ParseChatDebugUriSuccess = {
  readonly type: typeof ParseChatDebugUriResultType.Success
  readonly sessionId: string
}

export type ParseChatDebugUriError = {
  readonly type: typeof ParseChatDebugUriResultType.Error
  readonly code: number
  readonly message: string
}

export type ParseChatDebugUriResult = ParseChatDebugUriSuccess | ParseChatDebugUriError
