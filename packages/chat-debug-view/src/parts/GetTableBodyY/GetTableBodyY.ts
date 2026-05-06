import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { viewPadding } from '../SplitLayout/SplitLayout.ts'
import { devtoolsTableHeaderHeight } from '../TableMetrics/TableMetrics.ts'

export const getTableBodyY = (state: ChatDebugViewState, hasTimeline: boolean): number => {
  const { devtoolsRootGap, devtoolsTimelineHeight, devtoolsTopHeight, y } = state
  return y + viewPadding + devtoolsTopHeight + devtoolsRootGap + (hasTimeline ? devtoolsTimelineHeight : 0) + devtoolsTableHeaderHeight
}
