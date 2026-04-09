import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'

export const getSessionNotFoundMessage = (sessionId: string): string => {
  return ChatDebugStrings.noChatSessionFound(sessionId)
}
