import type { ChatDebugViewState } from '../../State/ChatDebugViewState.ts'
import { getStateWithTimelineInfo } from '../../GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'
import { withSelectedEventVisible } from '../../VirtualTable/VirtualTable.ts'
import { getPreservedSelectedEventIndex } from '../GetPreservedSelectedEventIndex/GetPreservedSelectedEventIndex.ts'

export const withPreservedSelection = (state: ChatDebugViewState, nextState: ChatDebugViewState): ChatDebugViewState => {
  const nextStateWithTimelineInfo = getStateWithTimelineInfo(nextState)
  const selectedEventIndex = getPreservedSelectedEventIndex(state, nextStateWithTimelineInfo)
  return withSelectedEventVisible({
    ...nextStateWithTimelineInfo,
    selectedEvent: selectedEventIndex === null ? null : state.selectedEvent,
    selectedEventId: selectedEventIndex === null ? null : state.selectedEventId,
    selectedEventIndex,
  })
}
