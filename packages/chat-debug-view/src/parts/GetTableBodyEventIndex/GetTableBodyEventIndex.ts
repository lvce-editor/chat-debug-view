import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getTableBodyY } from '../GetTableBodyY/GetTableBodyY.ts'
import { getCurrentEvents } from '../SelectEventAtIndex/SelectEventAtIndex.ts'
import { clampTableWidth, leftPadding } from '../SplitLayout/SplitLayout.ts'

const devtoolsTableRowHeight = 24

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
