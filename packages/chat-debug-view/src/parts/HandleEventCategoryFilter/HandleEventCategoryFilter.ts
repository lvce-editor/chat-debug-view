import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { withPreservedSelection } from '../PreserveSelection/PreserveSelection.ts'

export const handleEventCategoryFilter = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  const categoryFilters = EventCategoryFilter.selectCategoryFilter(state.categoryFilters, value || EventCategoryFilter.All)
  if (categoryFilters === state.categoryFilters) {
    return state
  }
  const nextState = {
    ...state,
    categoryFilters,
  }
  return withPreservedSelection(state, nextState)
}
