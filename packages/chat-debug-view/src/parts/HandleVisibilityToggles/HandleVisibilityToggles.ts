import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as GetBoolean from '../GetBoolean/GetBoolean.ts'
import { withPreservedSelection } from '../PreserveSelection/PreserveSelection.ts'

export const handleShowEventStreamFinishedEvents = (state: ChatDebugViewState, checked: string | boolean): ChatDebugViewState => {
  const nextState = {
    ...state,
    showEventStreamFinishedEvents: GetBoolean.getBoolean(checked),
  }
  return withPreservedSelection(state, nextState)
}

export const handleShowInputEvents = (state: ChatDebugViewState, checked: string | boolean): ChatDebugViewState => {
  const nextState = {
    ...state,
    showInputEvents: GetBoolean.getBoolean(checked),
  }
  return withPreservedSelection(state, nextState)
}

export const handleShowResponsePartEvents = (state: ChatDebugViewState, checked: string | boolean): ChatDebugViewState => {
  const nextState = {
    ...state,
    showResponsePartEvents: GetBoolean.getBoolean(checked),
  }
  return withPreservedSelection(state, nextState)
}
