import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { getDebugViewTopDom } from '../GetDebugViewTopDom/GetDebugViewTopDom.ts'
import { getDevtoolsDom } from '../GetDevtoolsDom/GetDevtoolsDom.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getLegacyEventsDom } from '../GetLegacyEventsDom/GetLegacyEventsDom.ts'
import { getQuickFilterNodes } from '../GetQuickFilterNodes/GetQuickFilterNodes.ts'
import { getTimelineFilterDescription } from '../GetTimelineFilterDescription/GetTimelineFilterDescription.ts'

const getDebugErrorDom = (errorMessage: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: 'ChatDebugView',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewError',
      type: VirtualDomElements.Div,
    },
    text(errorMessage),
  ]
}

export const getChatDebugViewDom = (
  errorMessage: string,
  filterValue: string,
  eventCategoryFilter: string,
  showEventStreamFinishedEvents: boolean,
  showInputEvents: boolean,
  showResponsePartEvents: boolean,
  useDevtoolsLayout: boolean,
  selectedEventIndex: number | null,
  timelineStartSeconds: string,
  timelineEndSeconds: string,
  timelineEvents: readonly ChatViewEvent[],
  events: readonly ChatViewEvent[],
): readonly VirtualDomNode[] => {
  if (errorMessage) {
    return getDebugErrorDom(errorMessage)
  }

  const eventNodes = events.flatMap(getEventNode)
  const trimmedFilterValue = filterValue.trim()
  const filterDescriptionParts = []
  if (eventCategoryFilter !== EventCategoryFilter.All) {
    filterDescriptionParts.push(EventCategoryFilter.getEventCategoryFilterLabel(eventCategoryFilter).toLowerCase())
  }
  if (trimmedFilterValue) {
    filterDescriptionParts.push(trimmedFilterValue)
  }
  const timelineFilterDescription = getTimelineFilterDescription(timelineStartSeconds, timelineEndSeconds)
  if (timelineFilterDescription) {
    filterDescriptionParts.push(timelineFilterDescription)
  }
  const hasFilterValue = filterDescriptionParts.length > 0
  const filterDescription = filterDescriptionParts.join(' ')
  const noFilteredEventsMessage = `no events found matching ${filterDescription}`
  const emptyMessage = events.length === 0 && hasFilterValue ? noFilteredEventsMessage : 'No events have been found'

  const safeSelectedEventIndex =
    selectedEventIndex === null || selectedEventIndex < 0 || selectedEventIndex >= events.length ? null : selectedEventIndex

  const contentNodes = useDevtoolsLayout
    ? getDevtoolsDom(events, safeSelectedEventIndex, timelineEvents, timelineStartSeconds, timelineEndSeconds, emptyMessage)
    : getLegacyEventsDom(errorMessage, emptyMessage, eventNodes)
  const quickFilterNodes = useDevtoolsLayout ? getQuickFilterNodes(eventCategoryFilter) : []
  const debugViewTopDom = getDebugViewTopDom(
    filterValue,
    showEventStreamFinishedEvents,
    showInputEvents,
    showResponsePartEvents,
    useDevtoolsLayout,
    quickFilterNodes,
  )
  const rootChildCount = useDevtoolsLayout ? 3 : 2

  return [
    {
      childCount: rootChildCount,
      className: useDevtoolsLayout ? 'ChatDebugView ChatDebugView--devtools' : 'ChatDebugView',
      type: VirtualDomElements.Div,
    },
    ...debugViewTopDom,
    ...contentNodes,
  ]
}
