import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'

export const appendStoredEventForTestDependencies = {
  appendEvent: ChatStorageWorkerClient.appendEvent,
}

export const appendStoredEventForTest = async (state: ChatDebugViewState, event: ChatViewEvent): Promise<ChatDebugViewState> => {
  await appendStoredEventForTestDependencies.appendEvent(event)
  return state
}
