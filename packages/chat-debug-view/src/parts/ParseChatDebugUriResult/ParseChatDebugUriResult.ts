import type { ParseChatDebugUriErrorCodeType } from '../ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'

export const ParseChatDebugUriResultType = {
  Success: 1,
  Error: 2,
} as const

export type ParseChatDebugUriResultType = (typeof ParseChatDebugUriResultType)[keyof typeof ParseChatDebugUriResultType]

export type ParseChatDebugUriSuccess = {
  readonly type: typeof ParseChatDebugUriResultType.Success
  readonly sessionId: string
}

export type ParseChatDebugUriError = {
  readonly type: typeof ParseChatDebugUriResultType.Error
  readonly code: ParseChatDebugUriErrorCodeType
  readonly message: string
}

export type ParseChatDebugUriResult = ParseChatDebugUriSuccess | ParseChatDebugUriError
