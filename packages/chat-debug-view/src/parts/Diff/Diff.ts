import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diff = (oldState: ChatDebugViewState, newState: ChatDebugViewState): readonly number[] => {
  if (
    oldState.categoryFilters !== newState.categoryFilters ||
    oldState.detailTabs !== newState.detailTabs ||
    oldState.errorMessage !== newState.errorMessage ||
    oldState.events !== newState.events ||
    oldState.filterValue !== newState.filterValue ||
    oldState.sessionId !== newState.sessionId ||
    oldState.showEventStreamFinishedEvents !== newState.showEventStreamFinishedEvents ||
    oldState.showInputEvents !== newState.showInputEvents ||
    oldState.showResponsePartEvents !== newState.showResponsePartEvents ||
    oldState.sortColumn !== newState.sortColumn ||
    oldState.sortDescending !== newState.sortDescending ||
    oldState.tableColumnWidths !== newState.tableColumnWidths ||
    oldState.tableWidth !== newState.tableWidth ||
    oldState.timelineEndSeconds !== newState.timelineEndSeconds ||
    oldState.timelineHoverPercent !== newState.timelineHoverPercent ||
    oldState.timelineHoverSeconds !== newState.timelineHoverSeconds ||
    oldState.timelineSelectionActive !== newState.timelineSelectionActive ||
    oldState.timelineSelectionAnchorSeconds !== newState.timelineSelectionAnchorSeconds ||
    oldState.timelineSelectionFocusSeconds !== newState.timelineSelectionFocusSeconds ||
    oldState.timelineStartSeconds !== newState.timelineStartSeconds ||
    oldState.useDevtoolsLayout !== newState.useDevtoolsLayout ||
    oldState.tableColumns !== newState.tableColumns ||
    oldState.selectedEvent !== newState.selectedEvent ||
    oldState.selectedEventIndex !== newState.selectedEventIndex ||
    oldState.focus !== newState.focus ||
    oldState.width !== newState.width ||
    oldState.uid !== newState.uid
  ) {
    return [DiffType.RenderIncremental, DiffType.RenderCss]
  }
  return []
}
