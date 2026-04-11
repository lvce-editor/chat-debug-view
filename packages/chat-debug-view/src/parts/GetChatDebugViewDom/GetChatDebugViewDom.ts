import { mergeClassNames, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { DetailTab as DetailTabType } from '../DetailTab/DetailTab.ts'
import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import type { TimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugView, ChatDebugViewDevtools } from '../ClassNames/ClassNames.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { getDebugErrorDom } from '../GetDebugErrorDom/GetDebugErrorDom.ts'
import { getDebugViewTopDom } from '../GetDebugViewTopDom/GetDebugViewTopDom.ts'
import { getDevtoolsDom } from '../GetDevtoolsDom/GetDevtoolsDom.ts'
import { getEmptyMessage } from '../GetEmptyMessage/GetEmptyMessage.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getLegacyEventsDom } from '../GetLegacyEventsDom/GetLegacyEventsDom.ts'
import { getTimelineFilterDescription } from '../GetTimelineFilterDescription/GetTimelineFilterDescription.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

const getNextSiblingIndex = (nodes: readonly VirtualDomNode[], index: number): number => {
  let nextSiblingIndex = index + 1
  const childCount = nodes[index]?.childCount || 0
  for (let i = 0; i < childCount; i++) {
    nextSiblingIndex = getNextSiblingIndex(nodes, nextSiblingIndex)
  }
  return nextSiblingIndex
}

const getTopLevelChildCount = (nodes: readonly VirtualDomNode[]): number => {
  let count = 0
  let index = 0
  while (index < nodes.length) {
    count++
    index = getNextSiblingIndex(nodes, index)
  }
  return count
}

const getEventCategoryFilterDescription = (eventCategoryFilters: readonly string[]): string => {
  if (eventCategoryFilters.length === 0 || eventCategoryFilters.includes(EventCategoryFilter.All)) {
    return ''
  }
  return eventCategoryFilters
    .map((eventCategoryFilter) => EventCategoryFilter.getEventCategoryFilterLabel(eventCategoryFilter).toLowerCase())
    .join(', ')
}

export const getChatDebugViewDom = (
  errorMessage: string,
  filterValue: string,
  eventCategoryFilters: readonly string[],
  categoryFilters: readonly CategoryFilter[],
  _showEventStreamFinishedEvents: boolean,
  _showInputEvents: boolean,
  _showResponsePartEvents: boolean,
  useDevtoolsLayout: boolean,
  selectedEvent: ChatViewEvent | null,
  selectedEventIndex: number | null,
  timelineStartSeconds: string,
  timelineEndSeconds: string,
  timelineEvents: readonly ChatViewEvent[],
  events: readonly ChatViewEvent[],
  timelineSelectionActive = false,
  timelineSelectionAnchorSeconds = '',
  timelineSelectionFocusSeconds = '',
  visibleTableColumns: readonly string[] = TableColumn.defaultVisibleTableColumns,
  detailTabs: readonly DetailTabType[] = DetailTab.createDetailTabs(),
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
  timelineInfo?: TimelineInfo,
  timelineHoverPercent: number | null = null,
  focus = 0,
): readonly VirtualDomNode[] => {
  if (errorMessage) {
    return getDebugErrorDom(errorMessage)
  }

  const trimmedFilterValue = filterValue.trim()
  const filterDescriptionParts = []
  const eventCategoryFilterDescription = getEventCategoryFilterDescription(eventCategoryFilters)
  if (eventCategoryFilterDescription) {
    filterDescriptionParts.push(eventCategoryFilterDescription)
  }
  if (trimmedFilterValue) {
    filterDescriptionParts.push(trimmedFilterValue)
  }
  const timelineFilterDescription = getTimelineFilterDescription(timelineStartSeconds, timelineEndSeconds)
  if (timelineFilterDescription) {
    filterDescriptionParts.push(timelineFilterDescription)
  }
  const hasTimelineFilter = Boolean(timelineFilterDescription)
  const hasFilterValue = filterDescriptionParts.length > 0
  const filterDescription = filterDescriptionParts.join(' ')
  const noFilteredEventsMessage = ChatDebugStrings.noEventsFoundMatching(filterDescription)
  const useNoToolCallEventsMessage =
    eventCategoryFilters.length === 1 && eventCategoryFilters[0] === EventCategoryFilter.Tools && !trimmedFilterValue && !hasTimelineFilter
  const emptyMessage = getEmptyMessage(events.length, hasFilterValue, useNoToolCallEventsMessage, noFilteredEventsMessage)

  const safeSelectedEventIndex =
    selectedEventIndex === null || selectedEventIndex < 0 || selectedEventIndex >= events.length ? null : selectedEventIndex

  if (useDevtoolsLayout) {
    return getDevtoolsDom(
      events,
      selectedEvent,
      safeSelectedEventIndex,
      timelineEvents,
      timelineStartSeconds,
      timelineEndSeconds,
      emptyMessage,
      timelineSelectionActive,
      timelineSelectionAnchorSeconds,
      timelineSelectionFocusSeconds,
      visibleTableColumns,
      detailTabs,
      tableColumns,
      timelineInfo,
      timelineHoverPercent,
      focus,
    )
  }
  const contentNodes = getLegacyEventsDom(errorMessage, emptyMessage, events.flatMap(getEventNode))
  const debugViewTopDom = getDebugViewTopDom(filterValue, useDevtoolsLayout, categoryFilters)
  const rootChildCount = 1 + getTopLevelChildCount(contentNodes)

  return [
    {
      childCount: rootChildCount,
      className: mergeClassNames(ChatDebugView, useDevtoolsLayout ? ChatDebugViewDevtools : ''),
      type: VirtualDomElements.Div,
    },
    ...debugViewTopDom,
    ...contentNodes,
  ]
}
