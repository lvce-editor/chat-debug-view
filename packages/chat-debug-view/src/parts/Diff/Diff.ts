import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diff = (oldState: ChatDebugViewState, newState: ChatDebugViewState): readonly number[] => {
  if (
    oldState.errorMessage !== newState.errorMessage ||
    oldState.events !== newState.events ||
    oldState.filterValue !== newState.filterValue ||
    oldState.sessionId !== newState.sessionId ||
    oldState.showEventStreamFinishedEvents !== newState.showEventStreamFinishedEvents ||
    oldState.showInputEvents !== newState.showInputEvents ||
    oldState.showResponsePartEvents !== newState.showResponsePartEvents ||
    oldState.useDevtoolsLayout !== newState.useDevtoolsLayout ||
    oldState.selectedEventIndex !== newState.selectedEventIndex ||
    oldState.uid !== newState.uid
  ) {
    return [DiffType.RenderIncremental, DiffType.RenderCss]
  }
  return []
}
