import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const isEqual = (oldState: ChatDebugViewState, newState: ChatDebugViewState): boolean => {
  return (
    oldState.height === newState.height &&
    oldState.initial === newState.initial &&
    oldState.defaultTableWidth === newState.defaultTableWidth &&
    oldState.tableWidth === newState.tableWidth
  )
}
