import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const handleTimelinePointerLeave = (state: ChatDebugViewState): ChatDebugViewState => {
  if (state.timelineHoverPercent === null && state.timelineHoverSeconds === '') {
    return state
  }
  return {
    ...state,
    timelineHoverPercent: null,
    timelineHoverSeconds: '',
  }
}