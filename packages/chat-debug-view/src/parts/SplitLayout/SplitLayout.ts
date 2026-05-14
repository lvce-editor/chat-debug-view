import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const getMainWidth = (state: ChatDebugViewState): number => {
  return Math.max(0, state.width - state.horizontalPadding)
}

const getNarrowMainWidthBreakpoint = (state: ChatDebugViewState): number => {
  return Math.max(0, state.mediumBreakpoint - state.horizontalPadding)
}

export const isNarrowSplitLayout = (state: ChatDebugViewState): boolean => {
  return getMainWidth(state) <= getNarrowMainWidthBreakpoint(state)
}

export const clampTableWidth = (state: ChatDebugViewState, tableWidth: number): number => {
  const mainWidth = getMainWidth(state)
  const maxTableWidth = Math.max(0, mainWidth - state.minDetailsWidth - state.sashWidth)
  const minClampedTableWidth = Math.min(state.minTableWidth, maxTableWidth)
  return Math.max(minClampedTableWidth, Math.min(tableWidth, maxTableWidth))
}

export const getDetailsWidth = (state: ChatDebugViewState, tableWidth: number): number => {
  const mainWidth = getMainWidth(state)
  const clampedTableWidth = clampTableWidth(state, tableWidth)
  return Math.max(0, mainWidth - clampedTableWidth - state.sashWidth)
}

export const getBalancedSplitTableWidth = (state: ChatDebugViewState): number => {
  const mainWidth = getMainWidth(state)
  const balancedTableWidth = Math.floor(Math.max(0, mainWidth - state.sashWidth) / 2)
  return clampTableWidth(state, balancedTableWidth)
}

export const shouldUseBalancedSplitTableWidth = (state: ChatDebugViewState): boolean => {
  return !!state.selectedEvent && state.useDevtoolsLayout && !state.tableWidthManuallyResized && isNarrowSplitLayout(state)
}

export const getTableWidthFromClientX = (state: ChatDebugViewState, clientX: number): number => {
  const nextTableWidth = clientX - state.x - state.leftPadding
  return clampTableWidth(state, nextTableWidth)
}
