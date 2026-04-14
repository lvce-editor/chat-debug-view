import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getTableBodyY } from '../GetTableBodyY/GetTableBodyY.ts'
import { getCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'
import { getMaxDeltaY, getScrollBarHeight, getTableBodyHeight, setTableDeltaY } from '../VirtualTable/VirtualTable.ts'

const getHandleOffsetAndPercent = (
  tableBodyHeight: number,
  scrollBarHeight: number,
  relativeY: number,
): { readonly handleOffset: number; readonly percent: number } => {
  const halfScrollBarHeight = scrollBarHeight / 2
  if (relativeY <= halfScrollBarHeight) {
    return {
      handleOffset: relativeY,
      percent: 0,
    }
  }
  if (relativeY <= tableBodyHeight - halfScrollBarHeight) {
    return {
      handleOffset: halfScrollBarHeight,
      percent: (relativeY - halfScrollBarHeight) / Math.max(1, tableBodyHeight - scrollBarHeight),
    }
  }
  return {
    handleOffset: scrollBarHeight - tableBodyHeight + relativeY,
    percent: 1,
  }
}

export const handleTableScrollBarPointerDown = (state: ChatDebugViewState, eventY: number): ChatDebugViewState => {
  const currentEvents = getCurrentEvents(state)
  const tableBodyHeight = getTableBodyHeight(state, currentEvents.length)
  const scrollBarHeight = getScrollBarHeight(currentEvents.length, tableBodyHeight)
  if (tableBodyHeight === 0 || scrollBarHeight === 0) {
    return state
  }
  const relativeY = eventY - getTableBodyY(state, currentEvents.length > 0)
  const { handleOffset, percent } = getHandleOffsetAndPercent(tableBodyHeight, scrollBarHeight, relativeY)
  const maxDeltaY = getMaxDeltaY(currentEvents.length, tableBodyHeight)
  const nextState = setTableDeltaY(state, percent * maxDeltaY)
  return {
    ...nextState,
    tableScrollBarHandleOffset: handleOffset,
    tableScrollBarPointerActive: true,
  }
}
