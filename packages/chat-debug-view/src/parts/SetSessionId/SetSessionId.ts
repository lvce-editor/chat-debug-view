import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { registerUpdateListener } from '../ChatStorageWorkerClient/ChatStorageWorkerClient.ts'
import { getFailedToLoadMessage } from '../GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import * as HandleStorageWorkerUpdate from '../HandleStorageWorkerUpdate/HandleStorageWorkerUpdate.ts'
import { listChatViewEvents } from '../ListChatViewEvents/ListChatViewEvents.ts'

export const setSessionId = async (state: ChatDebugViewState, sessionId: string): Promise<ChatDebugViewState> => {
  const { databaseName, dataBaseVersion, eventStoreName, sessionIdIndexName } = state
  const result = await listChatViewEvents(sessionId, databaseName, dataBaseVersion, eventStoreName, sessionIdIndexName)
  await registerUpdateListener(sessionId, HandleStorageWorkerUpdate.rpcId, state.uid)
  if (result.type === 'error') {
    return {
      ...state,
      errorMessage: getFailedToLoadMessage(sessionId, result.error),
      events: [],
      initial: false,
      previewTextCursorColumnIndex: null,
      previewTextCursorRowIndex: null,
      previewTextDeltaY: 0,
      previewTextScrollBarHandleOffset: 0,
      previewTextScrollBarPointerActive: false,
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
    previewTextDeltaY: 0,
    previewTextScrollBarHandleOffset: 0,
    previewTextScrollBarPointerActive: false,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
    sessionId,
  }
}
