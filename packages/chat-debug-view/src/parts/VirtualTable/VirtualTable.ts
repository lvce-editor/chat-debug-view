import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getTableBodyY } from '../GetTableBodyY/GetTableBodyY.ts'
import { getCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'
import { viewPadding } from '../SplitLayout/SplitLayout.ts'
import { devtoolsTableRowHeight, devtoolsTableSummaryHeight, minimumDevtoolsTableScrollBarHeight } from '../TableMetrics/TableMetrics.ts'

export const getTableBodyHeight = (state: ChatDebugViewState, eventCount: number): number => {
  if (eventCount === 0) {
    return 0
  }
  const tableBodyY = getTableBodyY(state, true)
  return Math.max(0, state.height - (tableBodyY - state.y) - viewPadding - devtoolsTableSummaryHeight)
}

export const getVisibleRowCount = (tableBodyHeight: number): number => {
  if (tableBodyHeight <= 0) {
    return 0
  }
  return Math.max(1, Math.ceil(tableBodyHeight / devtoolsTableRowHeight))
}

export const getMaxDeltaY = (eventCount: number, tableBodyHeight: number): number => {
  return Math.max(eventCount * devtoolsTableRowHeight - tableBodyHeight, 0)
}

export const clampTableDeltaY = (deltaY: number, eventCount: number, tableBodyHeight: number): number => {
  const maxDeltaY = getMaxDeltaY(eventCount, tableBodyHeight)
  if (deltaY < 0) {
    return 0
  }
  if (deltaY > maxDeltaY) {
    return maxDeltaY
  }
  return deltaY
}

export const getScrollBarHeight = (eventCount: number, tableBodyHeight: number): number => {
  if (eventCount === 0 || tableBodyHeight <= 0) {
    return 0
  }
  const contentHeight = eventCount * devtoolsTableRowHeight
  if (contentHeight <= tableBodyHeight) {
    return 0
  }
  return Math.max(minimumDevtoolsTableScrollBarHeight, Math.floor((tableBodyHeight * tableBodyHeight) / contentHeight))
}

export const getScrollBarOffset = (deltaY: number, maxDeltaY: number, tableBodyHeight: number, scrollBarHeight: number): number => {
  if (maxDeltaY <= 0 || scrollBarHeight <= 0 || tableBodyHeight <= scrollBarHeight) {
    return 0
  }
  return Math.round((deltaY / maxDeltaY) * (tableBodyHeight - scrollBarHeight))
}

export const applyVirtualTableState = (state: ChatDebugViewState): ChatDebugViewState => {
  const currentEvents = getCurrentEvents(state)
  const tableBodyHeight = getTableBodyHeight(state, currentEvents.length)
  const deltaY = clampTableDeltaY(state.tableDeltaY, currentEvents.length, tableBodyHeight)
  const minLineY = Math.floor(deltaY / devtoolsTableRowHeight)
  const visibleRowCount = getVisibleRowCount(tableBodyHeight)
  const maxLineY = Math.min(currentEvents.length, minLineY + visibleRowCount)
  return {
    ...state,
    tableDeltaY: deltaY,
    tableMaxLineY: maxLineY,
    tableMinLineY: minLineY,
  }
}

export const setTableDeltaY = (state: ChatDebugViewState, deltaY: number): ChatDebugViewState => {
  return applyVirtualTableState({
    ...state,
    tableDeltaY: deltaY,
  })
}

export const withSelectedEventVisible = (state: ChatDebugViewState): ChatDebugViewState => {
  if (state.selectedEventIndex === null || state.selectedEventIndex < 0) {
    return applyVirtualTableState(state)
  }
  const currentEvents = getCurrentEvents(state)
  const tableBodyHeight = getTableBodyHeight(state, currentEvents.length)
  const visibleRowCount = getVisibleRowCount(tableBodyHeight)
  if (visibleRowCount === 0) {
    return applyVirtualTableState(state)
  }
  const minLineY = Math.floor(state.tableDeltaY / devtoolsTableRowHeight)
  const maxLineY = minLineY + visibleRowCount
  if (state.selectedEventIndex < minLineY) {
    return setTableDeltaY(state, state.selectedEventIndex * devtoolsTableRowHeight)
  }
  if (state.selectedEventIndex >= maxLineY) {
    return setTableDeltaY(state, (state.selectedEventIndex + 1) * devtoolsTableRowHeight - tableBodyHeight)
  }
  return applyVirtualTableState(state)
}
