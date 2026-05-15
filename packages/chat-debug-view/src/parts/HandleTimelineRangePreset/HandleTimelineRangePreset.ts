import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { parseTimelineRangePreset } from '../ParseTimelineRangePreset/ParseTimelineRangePreset.ts'
import { withPreservedSelection } from '../PreserveSelection/PreserveSelection.ts'

export const handleTimelineRangePreset = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  const nextState = {
    ...state,
    ...parseTimelineRangePreset(value),
  }
  return withPreservedSelection(state, nextState)
}
