import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { createDetailTabs } from '../CreateDetailTabs/CreateDetailTabs.ts'
import { getSelectedDetailTab } from '../GetSelectedDetailTab/GetSelectedDetailTab.ts'
import { getCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'
import { mergeSelectedEventDetails } from '../MergeSelectedEventDetails/MergeSelectedEventDetails.ts'
import { withSelectedEventVisible } from '../VirtualTable/VirtualTable.ts'
import { withPreparedSelectedEventPreview } from '../WithPreparedSelectedEventPreview/WithPreparedSelectedEventPreview.ts'



export const selectEventAtIndex = async (
  state: ChatDebugViewState,
  selectedEventIndex: number,
): Promise<ChatDebugViewState> => {
  const { databaseName, dataBaseVersion, detailTabs, eventStoreName, sessionId, sessionIdIndexName } = state
  const selectedDetailTab = getSelectedDetailTab(detailTabs)
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
  const selectedEventDetails = await LoadSelectedEvent.loadSelectedEvent(
    databaseName,
    dataBaseVersion,
    eventStoreName,
    sessionId,
    sessionIdIndexName,
    selectedEvent.eventId,
    selectedEvent.type,
  )
  const resolvedSelectedEvent = await withPreparedSelectedEventPreview(mergeSelectedEventDetails(selectedEvent, selectedEventDetails))
  return withSelectedEventVisible({
    ...state,
    detailTabs: createDetailTabs(selectedDetailTab, resolvedSelectedEvent),
    previewTextCursorColumnIndex: null,
    previewTextCursorRowIndex: null,
    previewTextDeltaY: 0,
    previewTextScrollBarHandleOffset: 0,
    previewTextScrollBarPointerActive: false,
    selectedEvent: resolvedSelectedEvent,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex,
  })
}
