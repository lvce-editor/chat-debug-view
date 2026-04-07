import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { withPreservedSelection } from '../PreserveSelection/PreserveSelection.ts'

export const handleEventCategoryFilter = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  const nextState = {
    ...state,
    eventCategoryFilter: value || EventCategoryFilter.All,
  }
  return withPreservedSelection(state, nextState)
}
