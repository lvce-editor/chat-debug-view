import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { ViewletCommand } from '@lvce-editor/constants'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getChatDebugViewDom } from '../GetChatDebugViewDom/GetChatDebugViewDom.ts'
import { filterEventsByTimelineRange } from '../GetTimelineInfo/GetTimelineInfo.ts'
import { getTimelineEvents } from '../GetTimelineEvents/GetTimelineEvents.ts'

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
  const timelineEvents = getTimelineEvents(newState)
  const filteredEvents = filterEventsByTimelineRange(timelineEvents, newState.timelineStartSeconds, newState.timelineEndSeconds)
  const dom = getChatDebugViewDom(
    newState.errorMessage,
    newState.filterValue,
    newState.eventCategoryFilter,
    newState.showEventStreamFinishedEvents,
    newState.showInputEvents,
    newState.showResponsePartEvents,
    newState.useDevtoolsLayout,
    newState.selectedEvent,
    newState.selectedEventIndex,
    newState.timelineStartSeconds,
    newState.timelineEndSeconds,
    withSessionEventIds(timelineEvents),
    withSessionEventIds(filteredEvents),
    newState.timelineSelectionActive,
    newState.timelineSelectionAnchorSeconds,
    newState.timelineSelectionFocusSeconds,
  )
  return [ViewletCommand.SetDom2, newState.uid, dom]
}
