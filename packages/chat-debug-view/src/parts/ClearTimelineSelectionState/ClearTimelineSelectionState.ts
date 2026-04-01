import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const clearTimelineSelectionState = (state: ChatDebugViewState): ChatDebugViewState => {
  return {
    ...state,
    timelineSelectionActive: false,
    timelineSelectionAnchorSeconds: '',
    timelineSelectionFocusSeconds: '',
    timelineSelectionLeft: 0,
    timelineSelectionWidth: 0,
  }
}