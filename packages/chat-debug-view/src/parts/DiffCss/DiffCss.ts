import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const isEqual = (oldState: ChatDebugViewState, newState: ChatDebugViewState): boolean => {
  return (
    oldState.defaultTableWidth === newState.defaultTableWidth &&
    oldState.events.length === newState.events.length &&
    oldState.height === newState.height &&
    oldState.initial === newState.initial &&
    oldState.selectedEvent === newState.selectedEvent &&
    oldState.tableColumns === newState.tableColumns &&
    oldState.tableDeltaY === newState.tableDeltaY &&
    oldState.tableWidth === newState.tableWidth &&
    oldState.tableWidth === newState.tableWidth
  )
}
