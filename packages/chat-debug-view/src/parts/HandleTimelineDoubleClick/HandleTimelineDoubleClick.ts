import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clearTimelineSelectionState } from '../ClearTimelineSelectionState/ClearTimelineSelectionState.ts'
import { handleTimelineRangePreset } from '../HandleTimelineRangePreset/HandleTimelineRangePreset.ts'

export const handleTimelineDoubleClick = (state: ChatDebugViewState): ChatDebugViewState => {
  const nextState = handleTimelineRangePreset(state, '')
  return clearTimelineSelectionState(nextState)
}
