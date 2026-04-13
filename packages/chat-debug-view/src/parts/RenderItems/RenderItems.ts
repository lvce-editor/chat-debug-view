import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { ViewletCommand } from '@lvce-editor/constants'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { filterEventsByTimelineRange } from '../FilterEventsByTimelineRange/FilterEventsByTimelineRange.ts'
import { getChatDebugViewDom } from '../GetChatDebugViewDom/GetChatDebugViewDom.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

const withSessionEventIds = (events: readonly ChatViewEvent[]): readonly ChatViewEvent[] => {
  return events.map((event, index) => {
    return {
      ...event,
      eventId: typeof event.eventId === 'number' ? event.eventId : index + 1,
    }
  })
}

export const renderItems = (oldState: ChatDebugViewState, newState: ChatDebugViewState): readonly [string, number, readonly VirtualDomNode[]] => {
  if (newState.initial) {
    return [ViewletCommand.SetDom2, newState.uid, []]
  }
  const filteredEvents = filterEventsByTimelineRange(newState.timelineEvents, newState.timelineStartSeconds, newState.timelineEndSeconds)
  const dom = getChatDebugViewDom(
    newState.errorMessage,
    newState.filterValue,
    EventCategoryFilter.getSelectedEventCategoryFilters(newState.categoryFilters),
    newState.categoryFilters,
    newState.showEventStreamFinishedEvents,
    newState.showInputEvents,
    newState.showResponsePartEvents,
    newState.useDevtoolsLayout,
    newState.selectedEvent,
    newState.selectedEventIndex,
    newState.timelineStartSeconds,
    newState.timelineEndSeconds,
    newState.timelineFilterDescription,
    withSessionEventIds(newState.timelineEvents),
    withSessionEventIds(filteredEvents),
    newState.timelineSelectionActive,
    newState.timelineSelectionAnchorSeconds,
    newState.timelineSelectionFocusSeconds,
    TableColumn.getVisibleTableColumns(newState.tableColumns),
    newState.detailTabs,
    newState.tableColumns,
    newState.timelineInfo,
    newState.timelineHoverPercent,
    newState.focus,
    newState.previewTextCursorRowIndex,
    newState.previewTextCursorColumnIndex,
  )
  return [ViewletCommand.SetDom2, newState.uid, dom]
}
