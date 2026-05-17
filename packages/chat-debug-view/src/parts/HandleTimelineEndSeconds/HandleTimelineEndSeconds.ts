import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { withPreservedSelection } from '../PreserveSelection/PreserveSelection.ts'

export const handleTimelineEndSeconds = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  const nextState = {
    ...state,
    timelineEndSeconds: value,
  }
  return withPreservedSelection(state, nextState)
}
