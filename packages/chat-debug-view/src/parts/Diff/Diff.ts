import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diff = (oldState: ChatDebugViewState, newState: ChatDebugViewState): readonly number[] => {
  if (
    oldState.errorMessage !== newState.errorMessage ||
    oldState.eventCategoryFilter !== newState.eventCategoryFilter ||
    oldState.events !== newState.events ||
    oldState.filterValue !== newState.filterValue ||
    oldState.sessionId !== newState.sessionId ||
    oldState.showEventStreamFinishedEvents !== newState.showEventStreamFinishedEvents ||
    oldState.showInputEvents !== newState.showInputEvents ||
    oldState.showResponsePartEvents !== newState.showResponsePartEvents ||
    oldState.tableWidth !== newState.tableWidth ||
    oldState.timelineEndSeconds !== newState.timelineEndSeconds ||
    oldState.timelineSelectionActive !== newState.timelineSelectionActive ||
    oldState.timelineSelectionAnchorSeconds !== newState.timelineSelectionAnchorSeconds ||
    oldState.timelineSelectionFocusSeconds !== newState.timelineSelectionFocusSeconds ||
    oldState.timelineStartSeconds !== newState.timelineStartSeconds ||
    oldState.useDevtoolsLayout !== newState.useDevtoolsLayout ||
    oldState.selectedDetailTab !== newState.selectedDetailTab ||
    oldState.selectedEvent !== newState.selectedEvent ||
    oldState.selectedEventIndex !== newState.selectedEventIndex ||
    oldState.width !== newState.width ||
    oldState.uid !== newState.uid
  ) {
    return [DiffType.RenderIncremental, DiffType.RenderCss]
  }
  return []
}
