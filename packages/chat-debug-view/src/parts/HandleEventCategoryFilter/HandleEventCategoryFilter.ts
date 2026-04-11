import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { withPreservedSelection } from '../PreserveSelection/PreserveSelection.ts'

export const handleEventCategoryFilter = (state: ChatDebugViewState, value: string, ctrlKey = false, metaKey = false): ChatDebugViewState => {
  const { categoryFilters } = state
  const newCategoryFilters = EventCategoryFilter.selectCategoryFilter(categoryFilters, value || EventCategoryFilter.All, ctrlKey || metaKey)
  if (newCategoryFilters === categoryFilters) {
    return state
  }
  const nextState = {
    ...state,
    newCategoryFilters,
  }
  return withPreservedSelection(state, nextState)
}
