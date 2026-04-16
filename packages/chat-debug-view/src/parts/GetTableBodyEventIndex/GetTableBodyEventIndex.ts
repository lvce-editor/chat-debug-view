import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getTableBodyY } from '../GetTableBodyY/GetTableBodyY.ts'
import { getCurrentEvents } from '../SelectEventAtIndex/SelectEventAtIndex.ts'
import { clampTableWidth, leftPadding } from '../SplitLayout/SplitLayout.ts'
import { devtoolsTableRowHeight } from '../TableMetrics/TableMetrics.ts'

export const getTableBodyEventIndex = (state: ChatDebugViewState, eventX: number, eventY: number): number => {
  const { tableMaxLineY, tableMinLineY, tableWidth, useDevtoolsLayout, width, x } = state
  if (!useDevtoolsLayout) {
    return -1
  }
  const currentEvents = getCurrentEvents(state)
  if (currentEvents.length === 0) {
    return -1
  }
  const tableX = x + leftPadding
  const tableWidthNew = clampTableWidth(width, tableWidth)
  const hasTimeline = currentEvents.length > 0
  const tableBodyY = getTableBodyY(state, hasTimeline)
  const relativeX = eventX - tableX
  const relativeY = eventY - tableBodyY
  if (relativeX < 0 || relativeX >= tableWidthNew || relativeY < 0) {
    return -1
  }
  const eventIndex = tableMinLineY + Math.floor(relativeY / devtoolsTableRowHeight)
  if (eventIndex < tableMinLineY || eventIndex >= tableMaxLineY || eventIndex >= currentEvents.length) {
    return -1
  }
  return eventIndex
}
