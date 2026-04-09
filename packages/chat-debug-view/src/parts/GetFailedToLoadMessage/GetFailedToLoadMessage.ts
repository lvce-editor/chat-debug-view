import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'

const getErrorMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message
  }
  return undefined
}

export const getFailedToLoadMessage = (sessionId: string, error?: unknown): string => {
  const errorMessage = getErrorMessage(error)
  if (errorMessage) {
    return ChatDebugStrings.failedToLoadChatDebugSessionWithError(sessionId, errorMessage)
  }
  return ChatDebugStrings.failedToLoadChatDebugSession(sessionId)
}
