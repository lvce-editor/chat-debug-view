import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clearTimelineSelectionState } from '../ClearTimelineSelectionState/ClearTimelineSelectionState.ts'
import * as HandleInput from '../HandleInput/HandleInput.ts'
import * as InputName from '../InputName/InputName.ts'

export const handleTimelineDoubleClick = (state: ChatDebugViewState): ChatDebugViewState => {
  const nextState = HandleInput.handleInput(state, InputName.TimelineRangePreset, '', false)
  return clearTimelineSelectionState(nextState)
}
