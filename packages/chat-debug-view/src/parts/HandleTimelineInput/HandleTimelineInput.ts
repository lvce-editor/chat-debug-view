import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { withPreservedSelection } from '../PreserveSelection/PreserveSelection.ts'

const parseTimelineRangePreset = (value: string): { readonly timelineEndSeconds: string; readonly timelineStartSeconds: string } => {
  if (!value) {
    return {
      timelineEndSeconds: '',
      timelineStartSeconds: '',
    }
  }
  const [timelineStartSeconds = '', timelineEndSeconds = ''] = value.split(':', 2)
  return {
    timelineEndSeconds,
    timelineStartSeconds,
  }
}

export const handleTimelineStartSeconds = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  const nextState = {
    ...state,
    timelineStartSeconds: value,
  }
  return withPreservedSelection(state, nextState)
}

export const handleTimelineEndSeconds = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  const nextState = {
    ...state,
    timelineEndSeconds: value,
  }
  return withPreservedSelection(state, nextState)
}

export const handleTimelineRangePreset = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  const nextState = {
    ...state,
    ...parseTimelineRangePreset(value),
  }
  return withPreservedSelection(state, nextState)
}
