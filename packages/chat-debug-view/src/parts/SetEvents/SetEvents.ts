import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getStateWithTimelineInfo } from '../GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { applyVirtualTableState } from '../VirtualTable/VirtualTable.ts'

export const setEvents = (state: ChatDebugViewState, events: readonly ChatViewEvent[]): ChatDebugViewState => {
  return applyVirtualTableState(
    getStateWithTimelineInfo({
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
    }),
  )
}
