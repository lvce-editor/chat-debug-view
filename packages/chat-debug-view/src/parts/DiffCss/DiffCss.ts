import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const isEqual = (oldState: ChatDebugViewState, newState: ChatDebugViewState): boolean => {
  return (
    oldState.height === newState.height &&
    oldState.initial === newState.initial &&
    oldState.defaultTableWidth === newState.defaultTableWidth &&
    oldState.tableWidth === newState.tableWidth &&
    oldState.tableColumns === newState.tableColumns &&
    oldState.tableDeltaY === newState.tableDeltaY &&
    oldState.selectedEvent === newState.selectedEvent &&
    oldState.events.length === newState.events.length
  )
}
