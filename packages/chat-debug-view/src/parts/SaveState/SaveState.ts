import type { SavedState } from '../SavedState/SavedState.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const saveState = (state: ChatDebugViewState): SavedState => {
  const {
    eventCategoryFilter,
    filterValue,
    height,
    sessionId,
    showEventStreamFinishedEvents,
    showInputEvents,
    showResponsePartEvents,
    timelineEndSeconds,
    timelineStartSeconds,
    useDevtoolsLayout,
    width,
    x,
    y,
  } =
    state
  return {
    eventCategoryFilter,
    filterValue,
    height,
    sessionId,
    showEventStreamFinishedEvents,
    showInputEvents,
    showResponsePartEvents,
    timelineEndSeconds,
    timelineStartSeconds,
    useDevtoolsLayout,
    width,
    x,
    y,
  }
}
