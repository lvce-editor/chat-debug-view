import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getMainWidth } from '../SplitLayout/SplitLayout.ts'

export const getTimelineLeft = (state: ChatDebugViewState): number => {
  return state.x + state.viewPadding + state.timelineHorizontalPadding
}

export const getTimelineWidth = (state: ChatDebugViewState): number => {
  return Math.max(0, getMainWidth(state) - state.timelineHorizontalPadding * 2)
}
