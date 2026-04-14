import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import { getCurrentEvents as getSharedCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'
import { withSelectedEventVisible } from '../VirtualTable/VirtualTable.ts'
import { withPreparedSelectedEventPreview } from '../WithPreparedSelectedEventPreview/WithPreparedSelectedEventPreview.ts'

export interface SelectEventAtIndexDependencies {
  readonly loadSelectedEvent: typeof LoadSelectedEvent.loadSelectedEvent
}

export const selectEventAtIndexDependencies: SelectEventAtIndexDependencies = {
  loadSelectedEvent: LoadSelectedEvent.loadSelectedEvent,
}

export const getCurrentEvents = (state: ChatDebugViewState): readonly ChatViewEvent[] => getSharedCurrentEvents(state)

export const selectEventAtIndex = async (
  state: ChatDebugViewState,
  selectedEventIndex: number,
  dependencies: SelectEventAtIndexDependencies = selectEventAtIndexDependencies,
): Promise<ChatDebugViewState> => {
  const selectedDetailTab = DetailTab.getSelectedDetailTab(state.detailTabs)
  const currentEvents = getCurrentEvents(state)
  const selectedEvent = currentEvents[selectedEventIndex]
  if (!selectedEvent) {
    return {
      ...state,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex,
    }
  }
  if (typeof selectedEvent.eventId !== 'number') {
    return {
      ...state,
      selectedEvent,
      selectedEventId: null,
      selectedEventIndex,
    }
  }
  const selectedEventDetails = await dependencies.loadSelectedEvent(
    state.databaseName,
    state.dataBaseVersion,
    state.eventStoreName,
    state.sessionId,
    state.sessionIdIndexName,
    selectedEvent.eventId,
    selectedEvent.type,
  )
  const resolvedSelectedEvent = await withPreparedSelectedEventPreview(selectedEventDetails ?? selectedEvent)
  return withSelectedEventVisible({
    ...state,
    detailTabs: DetailTab.createDetailTabs(selectedDetailTab, resolvedSelectedEvent),
    previewTextCursorColumnIndex: null,
    previewTextCursorRowIndex: null,
    selectedEvent: resolvedSelectedEvent,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex,
  })
}
