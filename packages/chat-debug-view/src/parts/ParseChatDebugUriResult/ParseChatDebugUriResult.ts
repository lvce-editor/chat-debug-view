import type { ParseChatDebugUriErrorCodeType } from '../ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'

export type ParseChatDebugUriSuccess = {
  readonly type: 'success'
  readonly sessionId: string
}

export type ParseChatDebugUriError = {
  readonly type: 'error'
  readonly code: ParseChatDebugUriErrorCodeType
  readonly message: string
}

export type ParseChatDebugUriResult = ParseChatDebugUriSuccess | ParseChatDebugUriError
