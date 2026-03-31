import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { ViewletCommand } from '@lvce-editor/constants'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getChatDebugViewDom } from '../GetChatDebugViewDom/GetChatDebugViewDom.ts'
import { getFilteredEvents } from '../GetFilteredEvents/GetFilteredEvents.ts'

const withSessionEventIds = (events: readonly ChatViewEvent[]): readonly ChatViewEvent[] => {
  return events.map((event, index) => {
    return {
      ...event,
      eventId: index + 1,
    }
  })
}

export const renderItems = (oldState: ChatDebugViewState, newState: ChatDebugViewState): readonly [string, number, readonly VirtualDomNode[]] => {
  if (newState.initial) {
    return [ViewletCommand.SetDom2, newState.uid, []]
  }
  const eventsWithIds = withSessionEventIds(newState.events)
  const filteredEvents = getFilteredEvents(
    eventsWithIds,
    newState.filterValue,
    newState.eventCategoryFilter,
    newState.showInputEvents,
    newState.showResponsePartEvents,
    newState.showEventStreamFinishedEvents,
  )
  const dom = getChatDebugViewDom(
    newState.errorMessage,
    newState.filterValue,
    newState.eventCategoryFilter,
    newState.showEventStreamFinishedEvents,
    newState.showInputEvents,
    newState.showResponsePartEvents,
    newState.useDevtoolsLayout,
    newState.selectedEventIndex,
    filteredEvents,
  )
  return [ViewletCommand.SetDom2, newState.uid, dom]
}
