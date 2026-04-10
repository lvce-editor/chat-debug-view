import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { viewPadding } from '../SplitLayout/SplitLayout.ts'

const devtoolsRootGap = 4
const devtoolsTopHeight = 28
const devtoolsTimelineHeight = 88
const devtoolsTableHeaderHeight = 24

export const getTableBodyY = (state: ChatDebugViewState, hasTimeline: boolean): number => {
  return state.y + viewPadding + devtoolsTopHeight + devtoolsRootGap + (hasTimeline ? devtoolsTimelineHeight : 0) + devtoolsTableHeaderHeight
}
