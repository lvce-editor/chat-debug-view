import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as ChatStorageWorkerClient from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'
import { getFailedToLoadMessage } from '../GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import * as HandleStorageWorkerUpdate from '../HandleStorageWorkerUpdate/HandleStorageWorkerUpdate.ts'
import * as ListChatViewEvents from '../ListChatViewEvents/ListChatViewEvents.ts'

export const setSessionIdDependencies = {
  listChatViewEvents: ListChatViewEvents.listChatViewEvents,
  registerUpdateListener: ChatStorageWorkerClient.registerUpdateListener,
}

export const setSessionId = async (state: ChatDebugViewState, sessionId: string): Promise<ChatDebugViewState> => {
  const { databaseName, dataBaseVersion, eventStoreName, sessionIdIndexName } = state
  const result = await setSessionIdDependencies.listChatViewEvents(sessionId, databaseName, dataBaseVersion, eventStoreName, sessionIdIndexName)
  await setSessionIdDependencies.registerUpdateListener(sessionId, HandleStorageWorkerUpdate.rpcId, state.uid)
  if (result.type === 'error') {
    return {
      ...state,
      errorMessage: getFailedToLoadMessage(sessionId, result.error),
      events: [],
      initial: false,
      previewTextCursorColumnIndex: null,
      previewTextCursorRowIndex: null,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
      sessionId,
    }
  }
  const { events } = result
  return {
    ...state,
    errorMessage: '',
    events,
    initial: false,
    previewTextCursorColumnIndex: null,
    previewTextCursorRowIndex: null,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
    sessionId,
  }
}
