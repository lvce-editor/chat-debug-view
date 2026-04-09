import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getCurrentEvents } from '../SelectEventAtIndex/SelectEventAtIndex.ts'
import { clampTableWidth, leftPadding, viewPadding } from '../SplitLayout/SplitLayout.ts'

const devtoolsRootGap = 4
const devtoolsTopHeight = 28
const devtoolsTimelineHeight = 88
const devtoolsTableHeaderHeight = 24
const devtoolsTableRowHeight = 24

export const MenuChatDebugTableBody = 2190

const getTableBodyY = (state: ChatDebugViewState, hasTimeline: boolean): number => {
  return state.y + viewPadding + devtoolsTopHeight + devtoolsRootGap + (hasTimeline ? devtoolsTimelineHeight : 0) + devtoolsTableHeaderHeight
}

export const getTableBodyEventIndex = (state: ChatDebugViewState, eventX: number, eventY: number): number => {
  if (!state.useDevtoolsLayout) {
    return -1
  }
  const currentEvents = getCurrentEvents(state)
  if (currentEvents.length === 0) {
    return -1
  }
  const tableX = state.x + leftPadding
  const tableWidth = clampTableWidth(state.width, state.tableWidth)
  const hasTimeline = currentEvents.length > 0
  const tableBodyY = getTableBodyY(state, hasTimeline)
  const relativeX = eventX - tableX
  const relativeY = eventY - tableBodyY
  if (relativeX < 0 || relativeX >= tableWidth || relativeY < 0) {
    return -1
  }
  const eventIndex = Math.floor(relativeY / devtoolsTableRowHeight)
  if (eventIndex < 0 || eventIndex >= currentEvents.length) {
    return -1
  }
  return eventIndex
}
