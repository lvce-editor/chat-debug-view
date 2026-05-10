import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { createDetailTabs } from '../CreateDetailTabs/CreateDetailTabs.ts'
import { getSelectedDetailTab } from '../GetSelectedDetailTab/GetSelectedDetailTab.ts'
import { getCurrentEvents as getSharedCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'
import * as LoadSelectedEvent from '../LoadSelectedEvent/LoadSelectedEvent.ts'
import { mergeSelectedEventDetails } from '../MergeSelectedEventDetails/MergeSelectedEventDetails.ts'
import { withSelectedEventVisible } from '../VirtualTable/VirtualTable.ts'
import { withPreparedSelectedEventPreview } from '../WithPreparedSelectedEventPreview/WithPreparedSelectedEventPreview.ts'

export interface SelectEventAtIndexDependencies {
  readonly loadSelectedEvent: typeof LoadSelectedEvent.loadSelectedEvent
}

export const selectEventAtIndexDependencies: SelectEventAtIndexDependencies = {
  loadSelectedEvent: LoadSelectedEvent.loadSelectedEvent,
}

export const getCurrentEvents = (state: ChatDebugViewState): readonly ChatViewEvent[] => getSharedCurrentEvents(state)

const getSelectedEventDetailsType = (selectedEvent: ChatViewEvent): string => {
  if (selectedEvent.type === 'ai-request-finished') {
    const { requestEvent } = selectedEvent as {
      readonly requestEvent?: unknown
    }
    if (requestEvent && typeof requestEvent === 'object' && typeof (requestEvent as ChatViewEvent).type === 'string') {
      return (requestEvent as ChatViewEvent).type
    }
  }
  return selectedEvent.type
}

export const selectEventAtIndex = async (
  state: ChatDebugViewState,
  selectedEventIndex: number,
  dependencies: SelectEventAtIndexDependencies = selectEventAtIndexDependencies,
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
  const selectedEventDetails = await dependencies.loadSelectedEvent(
    databaseName,
    dataBaseVersion,
    eventStoreName,
    sessionId,
    sessionIdIndexName,
    selectedEvent.eventId,
    getSelectedEventDetailsType(selectedEvent),
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
