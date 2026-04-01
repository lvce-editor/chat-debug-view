import type { SavedState } from '../SavedState/SavedState.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const saveState = (state: ChatDebugViewState): SavedState => {
  const { eventCategoryFilter, filterValue, height, selectedEventId, sessionId, tableWidth, timelineEndSeconds, timelineStartSeconds, width, x, y } =
    state
  return {
    eventCategoryFilter,
    filterValue,
    height,
    selectedEventId,
    sessionId,
    tableWidth,
    timelineEndSeconds,
    timelineStartSeconds,
    width,
    x,
    y,
  }
}
