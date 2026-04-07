import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clearTimelineSelectionState } from '../ClearTimelineSelectionState/ClearTimelineSelectionState.ts'
import * as HandleTimelineInput from '../HandleTimelineInput/HandleTimelineInput.ts'

export const handleTimelineDoubleClick = (state: ChatDebugViewState): ChatDebugViewState => {
  const nextState = HandleTimelineInput.handleTimelineRangePreset(state, '')
  return clearTimelineSelectionState(nextState)
}
