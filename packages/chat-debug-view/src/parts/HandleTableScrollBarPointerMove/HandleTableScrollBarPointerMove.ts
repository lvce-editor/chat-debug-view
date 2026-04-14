import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getTableBodyY } from '../GetTableBodyY/GetTableBodyY.ts'
import { getCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'
import { getMaxDeltaY, getScrollBarHeight, getTableBodyHeight, setTableDeltaY } from '../VirtualTable/VirtualTable.ts'

export const handleTableScrollBarPointerMove = (state: ChatDebugViewState, eventY: number): ChatDebugViewState => {
  if (!state.tableScrollBarPointerActive) {
    return state
  }
  const currentEvents = getCurrentEvents(state)
  const tableBodyHeight = getTableBodyHeight(state, currentEvents.length)
  const scrollBarHeight = getScrollBarHeight(currentEvents.length, tableBodyHeight)
  if (tableBodyHeight === 0 || scrollBarHeight === 0) {
    return state
  }
  const relativeY = eventY - getTableBodyY(state, currentEvents.length > 0)
  const nextHandleTop = Math.max(0, Math.min(tableBodyHeight - scrollBarHeight, relativeY - state.tableScrollBarHandleOffset))
  const percent = nextHandleTop / Math.max(1, tableBodyHeight - scrollBarHeight)
  const maxDeltaY = getMaxDeltaY(currentEvents.length, tableBodyHeight)
  const nextState = setTableDeltaY(state, percent * maxDeltaY)
  return {
    ...nextState,
    tableScrollBarPointerActive: true,
  }
}
