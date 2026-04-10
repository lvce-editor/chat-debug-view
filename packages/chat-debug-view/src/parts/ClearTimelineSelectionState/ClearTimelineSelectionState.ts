import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getStateWithTimelineInfo } from '../GetStateWithTimelineInfo/GetStateWithTimelineInfo.ts'

export const clearTimelineSelectionState = (state: ChatDebugViewState): ChatDebugViewState => {
  return getStateWithTimelineInfo({
    ...state,
    timelineSelectionActive: false,
    timelineSelectionAnchorSeconds: '',
    timelineSelectionFocusSeconds: '',
  })
}
