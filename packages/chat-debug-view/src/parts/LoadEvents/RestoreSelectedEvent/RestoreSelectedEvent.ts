import type { ChatViewEvent } from '../../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import { mergeSelectedEventDetails } from '../../MergeSelectedEventDetails/MergeSelectedEventDetails.ts'
import { withPreparedSelectedEventPreview } from '../../WithPreparedSelectedEventPreview/WithPreparedSelectedEventPreview.ts'
import { getCurrentEvents } from '../GetCurrentEvents/GetCurrentEvents.ts'
import { loadEventsDependencies } from '../LoadEventsDependencies/LoadEventsDependencies.ts'

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

export const restoreSelectedEvent = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  if (state.selectedEventId === null) {
    return {
      ...state,
      previewTextCursorColumnIndex: null,
      previewTextCursorRowIndex: null,
      previewTextDeltaY: 0,
      previewTextScrollBarHandleOffset: 0,
      previewTextScrollBarPointerActive: false,
      selectedEvent: null,
      selectedEventIndex: null,
    }
  }
  const currentEvents = getCurrentEvents(state)
  const selectedEventIndex = currentEvents.findIndex((event) => event.eventId === state.selectedEventId)
  if (selectedEventIndex === -1) {
    return {
      ...state,
      previewTextCursorColumnIndex: null,
      previewTextCursorRowIndex: null,
      previewTextDeltaY: 0,
      previewTextScrollBarHandleOffset: 0,
      previewTextScrollBarPointerActive: false,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
    }
  }
  const selectedEvent = currentEvents[selectedEventIndex]
  if (!selectedEvent || typeof selectedEvent.eventId !== 'number') {
    return {
      ...state,
      previewTextCursorColumnIndex: null,
      previewTextCursorRowIndex: null,
      previewTextDeltaY: 0,
      previewTextScrollBarHandleOffset: 0,
      previewTextScrollBarPointerActive: false,
      selectedEvent: null,
      selectedEventId: null,
      selectedEventIndex: null,
    }
  }
  const selectedEventDetails = await loadEventsDependencies.loadSelectedEvent(
    state.databaseName,
    state.dataBaseVersion,
    state.eventStoreName,
    state.sessionId,
    state.sessionIdIndexName,
    selectedEvent.eventId,
    getSelectedEventDetailsType(selectedEvent),
  )
  const resolvedSelectedEvent = await withPreparedSelectedEventPreview(mergeSelectedEventDetails(selectedEvent, selectedEventDetails))
  return {
    ...state,
    previewTextCursorColumnIndex: null,
    previewTextCursorRowIndex: null,
    previewTextDeltaY: 0,
    previewTextScrollBarHandleOffset: 0,
    previewTextScrollBarPointerActive: false,
    selectedEvent: resolvedSelectedEvent,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex,
  }
}
