import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getMainWidth, timelineHorizontalPadding, viewPadding } from '../SplitLayout/SplitLayout.ts'

export const getTimelineLeft = (state: ChatDebugViewState): number => {
  return state.x + viewPadding + timelineHorizontalPadding
}

export const getTimelineWidth = (state: ChatDebugViewState): number => {
  return Math.max(0, getMainWidth(state.width) - timelineHorizontalPadding * 2)
}
