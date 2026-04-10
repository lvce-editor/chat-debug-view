import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'

export const appendStoredEventForTest = async (state: ChatDebugViewState, event: ChatViewEvent): Promise<ChatDebugViewState> => {
  await ChatStorageWorkerClient.appendEvent(event)
  return state
}
