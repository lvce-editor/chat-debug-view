import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import { loadSelectedEvent } from '../../LoadSelectedEvent/LoadSelectedEvent.ts'
import { mergeSelectedEventDetails } from '../../MergeSelectedEventDetails/MergeSelectedEventDetails.ts'
import { withPreparedSelectedEventPreview } from '../../WithPreparedSelectedEventPreview/WithPreparedSelectedEventPreview.ts'
import { getCurrentEvents } from '../GetCurrentEvents/GetCurrentEvents.ts'

export const restoreSelectedEvent = async (state: ChatDebugViewState): Promise<ChatDebugViewState> => {
  const { selectedEventId } = state
  if (selectedEventId === null) {
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
  const selectedEventDetails = await loadSelectedEvent({
    eventId: selectedEvent.eventId,
    sessionId: state.sessionId,
    type: selectedEvent.type,
  })
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
