import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { withPreservedSelection } from '../PreserveSelection/PreserveSelection.ts'

export const handleTimelineStartSeconds = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  const nextState = {
    ...state,
    timelineStartSeconds: value,
  }
  return withPreservedSelection(state, nextState)
}
