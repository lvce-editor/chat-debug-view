import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getStateWithTimelineInfo } from '../GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const setEvents = (state: ChatDebugViewState, events: readonly ChatViewEvent[]): ChatDebugViewState => {
  return getStateWithTimelineInfo({
    ...state,
    errorMessage: '',
    events,
    initial: false,
    selectedEvent: null,
    selectedEventId: null,
    selectedEventIndex: null,
  })
}
