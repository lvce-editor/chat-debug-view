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
import { getQuickFilterNodes } from '../GetQuickFilterNodes/GetQuickFilterNodes.ts'
import { getTimelineFilterDescription } from '../GetTimelineFilterDescription/GetTimelineFilterDescription.ts'
import * as InputName from '../InputName/InputName.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getChatDebugViewDom = (
  errorMessage: string,
  filterValue: string,
  eventCategoryFilter: string,
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
  selectedDetailTab = InputName.Response,
  visibleTableColumns: readonly string[] = TableColumn.defaultVisibleTableColumns,
  detailTabs: readonly DetailTabType[] = DetailTab.createDetailTabs(),
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
  timelineInfo?: TimelineInfo,
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
  const hasTimelineFilter = Boolean(timelineFilterDescription)
  const hasFilterValue = filterDescriptionParts.length > 0
  const filterDescription = filterDescriptionParts.join(' ')
  const noFilteredEventsMessage = ChatDebugStrings.noEventsFoundMatching(filterDescription)
  const useNoToolCallEventsMessage = eventCategoryFilter === EventCategoryFilter.Tools && !trimmedFilterValue && !hasTimelineFilter
  const emptyMessage = getEmptyMessage(events.length, hasFilterValue, useNoToolCallEventsMessage, noFilteredEventsMessage)

  const safeSelectedEventIndex =
    selectedEventIndex === null || selectedEventIndex < 0 || selectedEventIndex >= events.length ? null : selectedEventIndex

  const contentNodes = useDevtoolsLayout
    ? getDevtoolsDom(
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
        DetailTab.getSelectedDetailTab(detailTabs, selectedDetailTab),
        visibleTableColumns,
        detailTabs,
        tableColumns,
        timelineInfo,
      )
    : getLegacyEventsDom(errorMessage, emptyMessage, events.flatMap(getEventNode))
  const quickFilterNodes = useDevtoolsLayout ? getQuickFilterNodes(eventCategoryFilter, categoryFilters) : []
  const debugViewTopDom = getDebugViewTopDom(filterValue, useDevtoolsLayout, quickFilterNodes)
  const rootChildCount = 2

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
