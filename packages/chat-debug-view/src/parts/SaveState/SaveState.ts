import type { SavedState } from '../SavedState/SavedState.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const saveState = (state: ChatDebugViewState): SavedState => {
  const {
    eventCategoryFilter,
    filterValue,
    selectedDetailTab,
    selectedEventId,
    sessionId,
    timelineEndSeconds,
    timelineStartSeconds,
    visibleTableColumns,
  } = state
  return {
    eventCategoryFilter,
    filterValue,
    selectedDetailTab,
    selectedEventId,
    sessionId,
    timelineEndSeconds,
    timelineStartSeconds,
    visibleTableColumns,
  }
}
