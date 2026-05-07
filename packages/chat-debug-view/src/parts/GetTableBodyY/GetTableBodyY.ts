import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { devtoolsTableHeaderHeight } from '../TableMetrics/TableMetrics.ts'

export const getTableBodyY = (state: ChatDebugViewState, hasTimeline: boolean): number => {
  const { devtoolsRootGap, devtoolsTimelineHeight, devtoolsTopHeight, viewPadding, y } = state
  return y + viewPadding + devtoolsTopHeight + devtoolsRootGap + (hasTimeline ? devtoolsTimelineHeight : 0) + devtoolsTableHeaderHeight
}
