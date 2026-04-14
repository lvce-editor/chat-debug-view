import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import { getFailedToLoadMessage } from '../../GetFailedToLoadMessage/GetFailedToLoadMessage.ts'
import { getSessionNotFoundMessage } from '../../GetSessionNotFoundMessage/GetSessionNotFoundMessage.ts'
import { getStateWithTimelineInfo } from '../../GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { applyVirtualTableState, withSelectedEventVisible } from '../../VirtualTable/VirtualTable.ts'
import { loadEventsDependencies } from '../LoadEventsDependencies/LoadEventsDependencies.ts'
import { restoreSelectedEvent } from '../RestoreSelectedEvent/RestoreSelectedEvent.ts'

export const loadEventsForSessionId = async (state: ChatDebugViewState, sessionId: string): Promise<ChatDebugViewState> => {
  const { databaseName, dataBaseVersion, eventStoreName, sessionIdIndexName } = state
  const result = await loadEventsDependencies.listChatViewEvents(sessionId, databaseName, dataBaseVersion, eventStoreName, sessionIdIndexName)

  if (result.type === 'error') {
    return applyVirtualTableState(
      getStateWithTimelineInfo({
        ...state,
        errorMessage: getFailedToLoadMessage(sessionId, result.error),
        events: [],
        initial: false,
        selectedEvent: null,
        selectedEventId: null,
        selectedEventIndex: null,
        sessionId,
      }),
    )
  }

  const { events } = result
  if (events.length === 0) {
    return applyVirtualTableState(
      getStateWithTimelineInfo({
        ...state,
        errorMessage: getSessionNotFoundMessage(sessionId),
        events: [],
        initial: false,
        selectedEvent: null,
        selectedEventId: null,
        selectedEventIndex: null,
        sessionId,
      }),
    )
  }

  const nextState = getStateWithTimelineInfo({
    ...state,
    errorMessage: '',
    events,
    initial: false,
    sessionId,
  })
  const restoredState = await restoreSelectedEvent(nextState)
  return withSelectedEventVisible(restoredState)
}
