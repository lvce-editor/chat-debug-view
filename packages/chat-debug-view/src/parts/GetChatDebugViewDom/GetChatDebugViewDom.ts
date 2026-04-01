import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as EventCategoryFilter from '../EventCategoryFilter/EventCategoryFilter.ts'
import { getDevtoolsDom } from '../GetDevtoolsDom/GetDevtoolsDom.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import * as InputName from '../InputName/InputName.ts'

const getLegacyEventsDom = (errorMessage: string, emptyMessage: string, eventNodes: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: eventNodes.length === 0 ? 1 : eventNodes.length,
      className: 'ChatDebugViewEvents',
      type: VirtualDomElements.Div,
    },
    ...(eventNodes.length === 0
      ? [
          {
            childCount: 1,
            className: errorMessage ? 'ChatDebugViewError' : 'ChatDebugViewEmpty',
            type: VirtualDomElements.Div,
          },
          text(errorMessage || emptyMessage),
        ]
      : eventNodes),
  ]
}

const getQuickFilterNodes = (eventCategoryFilter: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: EventCategoryFilter.options.length,
      className: 'ChatDebugViewQuickFilters',
      type: VirtualDomElements.Div,
    },
    ...EventCategoryFilter.options.flatMap((option) => {
      const isSelected = option.value === eventCategoryFilter
      return [
        {
          childCount: 2,
          className: `ChatDebugViewQuickFilterPill${isSelected ? ' ChatDebugViewQuickFilterPillSelected' : ''}`,
          type: VirtualDomElements.Label,
        },
        {
          checked: isSelected,
          childCount: 0,
          className: 'ChatDebugViewQuickFilterInput',
          inputType: 'radio',
          name: InputName.EventCategoryFilter,
          onChange: DomEventListenerFunctions.HandleInput,
          type: VirtualDomElements.Input,
          value: option.value,
        },
        text(option.label),
      ]
    }),
  ]
}

const getTimelineFilterDescription = (timelineStartSeconds: string, timelineEndSeconds: string): string => {
  const trimmedStart = timelineStartSeconds.trim()
  const trimmedEnd = timelineEndSeconds.trim()
  if (trimmedStart && trimmedEnd) {
    return `${trimmedStart}s-${trimmedEnd}s`
  }
  if (trimmedStart) {
    return `from ${trimmedStart}s`
  }
  if (trimmedEnd) {
    return `to ${trimmedEnd}s`
  }
  return ''
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
  const eventCountText = events.length === 0 && hasFilterValue ? noFilteredEventsMessage : `${events.length} event${events.length === 1 ? '' : 's'}`
  const emptyMessage = events.length === 0 && hasFilterValue ? noFilteredEventsMessage : 'No events'

  const safeSelectedEventIndex =
    selectedEventIndex === null || selectedEventIndex < 0 || selectedEventIndex >= events.length ? null : selectedEventIndex

  const contentNodes = useDevtoolsLayout
    ? getDevtoolsDom(events, safeSelectedEventIndex, timelineEvents, timelineStartSeconds, timelineEndSeconds)
    : getLegacyEventsDom(errorMessage, emptyMessage, eventNodes)
  const quickFilterNodes = useDevtoolsLayout ? getQuickFilterNodes(eventCategoryFilter) : []
  const rootChildCount = useDevtoolsLayout ? 4 : 3

  return [
    {
      childCount: rootChildCount,
      className: useDevtoolsLayout ? 'ChatDebugView ChatDebugView--devtools' : 'ChatDebugView',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewTop',
      type: VirtualDomElements.Div,
    },
    {
      autocomplete: 'off',
      childCount: 0,
      className: 'InputBox ChatDebugViewFilterInput',
      inputType: 'search',
      name: InputName.Filter,
      onInput: DomEventListenerFunctions.HandleFilterInput,
      placeholder: 'Filter events',
      type: VirtualDomElements.Input,
      value: filterValue,
    },
    {
      childCount: 4,
      className: 'ChatDebugViewToggle',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewToggleLabel',
      type: VirtualDomElements.Label,
    },
    {
      checked: showEventStreamFinishedEvents,
      childCount: 0,
      className: 'ChatDebugViewToggleShowEventStreamFinishedEvents',
      inputType: 'checkbox',
      name: InputName.ShowEventStreamFinishedEvents,
      onChange: DomEventListenerFunctions.HandleInput,
      type: VirtualDomElements.Input,
    },
    text('Show event stream finished events'),
    {
      childCount: 2,
      className: 'ChatDebugViewToggleLabel',
      type: VirtualDomElements.Label,
    },
    {
      checked: showInputEvents,
      childCount: 0,
      className: 'ChatDebugViewToggleShowInputEvents',
      inputType: 'checkbox',
      name: InputName.ShowInputEvents,
      onChange: DomEventListenerFunctions.HandleInput,
      type: VirtualDomElements.Input,
    },
    text('Show input events'),
    {
      childCount: 2,
      className: 'ChatDebugViewToggleLabel',
      type: VirtualDomElements.Label,
    },
    {
      checked: showResponsePartEvents,
      childCount: 0,
      className: 'ChatDebugViewToggleShowResponsePartEvents',
      inputType: 'checkbox',
      name: InputName.ShowResponsePartEvents,
      onChange: DomEventListenerFunctions.HandleInput,
      type: VirtualDomElements.Input,
    },
    text('Show response part events'),
    {
      childCount: 2,
      className: 'ChatDebugViewToggleLabel',
      type: VirtualDomElements.Label,
    },
    {
      checked: useDevtoolsLayout,
      childCount: 0,
      className: 'ChatDebugViewToggleUseDevtoolsLayout',
      inputType: 'checkbox',
      name: InputName.UseDevtoolsLayout,
      onChange: DomEventListenerFunctions.HandleInput,
      type: VirtualDomElements.Input,
    },
    text('Use devtools layout'),
    ...quickFilterNodes,
    {
      childCount: 1,
      className: 'ChatDebugViewEventCount',
      type: VirtualDomElements.Div,
    },
    text(eventCountText),
    ...contentNodes,
  ]
}
