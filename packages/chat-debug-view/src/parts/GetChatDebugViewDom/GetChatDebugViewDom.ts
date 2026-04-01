import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { getDebugErrorDom } from '../GetDebugErrorDom/GetDebugErrorDom.ts'
import { getDebugViewTopDom } from '../GetDebugViewTopDom/GetDebugViewTopDom.ts'
import { getDevtoolsDom } from '../GetDevtoolsDom/GetDevtoolsDom.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getLegacyEventsDom } from '../GetLegacyEventsDom/GetLegacyEventsDom.ts'
import { getQuickFilterNodes } from '../GetQuickFilterNodes/GetQuickFilterNodes.ts'
import { getTimelineFilterDescription } from '../GetTimelineFilterDescription/GetTimelineFilterDescription.ts'

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
  timelineSelectionActive = false,
  timelineSelectionAnchorSeconds = '',
  timelineSelectionFocusSeconds = '',
): readonly VirtualDomNode[] => {
  if (errorMessage) {
    return getDebugErrorDom(errorMessage)
  }

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
    ? getDevtoolsDom(
        events,
        safeSelectedEventIndex,
        timelineEvents,
        timelineStartSeconds,
        timelineEndSeconds,
        emptyMessage,
        timelineSelectionActive,
        timelineSelectionAnchorSeconds,
        timelineSelectionFocusSeconds,
      )
    : getLegacyEventsDom(errorMessage, emptyMessage, events.flatMap(getEventNode))
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
