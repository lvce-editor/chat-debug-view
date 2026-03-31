import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import * as InputName from '../InputName/InputName.ts'

const getTimestampText = (value: unknown): string => {
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return new Date(value).toISOString()
  }
  return '-'
}

const toTimeNumber = (value: unknown): number | undefined => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }
  if (typeof value === 'string') {
    const timestamp = Date.parse(value)
    if (!Number.isNaN(timestamp)) {
      return timestamp
    }
  }
  return undefined
}

const getDurationText = (event: ChatViewEvent): string => {
  const explicitDuration = event.durationMs ?? event.duration
  if (typeof explicitDuration === 'number' && Number.isFinite(explicitDuration)) {
    return `${explicitDuration}ms`
  }
  const start = toTimeNumber(event.started ?? event.startTime ?? event.startTimestamp ?? event.timestamp)
  const end = toTimeNumber(event.ended ?? event.endTime ?? event.endTimestamp ?? event.timestamp)
  if (start === undefined || end === undefined || end < start) {
    return '-'
  }
  return `${end - start}ms`
}

const getStartText = (event: ChatViewEvent): string => {
  return getTimestampText(event.started ?? event.startTime ?? event.startTimestamp ?? event.timestamp)
}

const getEndText = (event: ChatViewEvent): string => {
  return getTimestampText(event.ended ?? event.endTime ?? event.endTimestamp ?? event.timestamp)
}

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

const getDevtoolsRows = (events: readonly ChatViewEvent[], selectedEventIndex: number | null): readonly VirtualDomNode[] => {
  if (events.length === 0) {
    return [
      {
        childCount: 1,
        className: 'ChatDebugViewEmpty',
        type: VirtualDomElements.Div,
      },
      text('No events'),
    ]
  }
  const rows: VirtualDomNode[] = []
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    const isSelected = selectedEventIndex === i
    rows.push(
      {
        childCount: 2,
        className: `ChatDebugViewEventRowLabel${isSelected ? ' ChatDebugViewEventRowLabelSelected' : ''}`,
        type: VirtualDomElements.Label,
      },
      {
        checked: isSelected,
        childCount: 0,
        className: 'ChatDebugViewEventRowInput',
        inputType: 'radio',
        name: InputName.SelectedEventIndex,
        onChange: DomEventListenerFunctions.HandleSimpleInput,
        type: VirtualDomElements.Input,
        value: String(i),
      },
      {
        childCount: 4,
        className: `ChatDebugViewEventRow${isSelected ? ' ChatDebugViewEventRowSelected' : ''}`,
        type: VirtualDomElements.Div,
      },
      {
        childCount: 1,
        className: 'ChatDebugViewCell ChatDebugViewCellType',
        type: VirtualDomElements.Div,
      },
      text(event.type),
      {
        childCount: 1,
        className: 'ChatDebugViewCell',
        type: VirtualDomElements.Div,
      },
      text(getStartText(event)),
      {
        childCount: 1,
        className: 'ChatDebugViewCell',
        type: VirtualDomElements.Div,
      },
      text(getEndText(event)),
      {
        childCount: 1,
        className: 'ChatDebugViewCell ChatDebugViewCellDuration',
        type: VirtualDomElements.Div,
      },
      text(getDurationText(event)),
    )
  }
  return rows
}

const getDevtoolsDom = (
  eventNodes: readonly VirtualDomNode[],
  events: readonly ChatViewEvent[],
  selectedEventIndex: number | null,
): readonly VirtualDomNode[] => {
  const rowNodes = getDevtoolsRows(events, selectedEventIndex)
  const selectedEvent = selectedEventIndex === null ? undefined : events[selectedEventIndex]
  const selectedEventNodes = selectedEvent ? getEventNode(selectedEvent) : []
  const hasSelectedEvent = selectedEventNodes.length > 0
  return [
    {
      childCount: 2,
      className: 'ChatDebugViewDevtoolsMain',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewEvents',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 4,
      className: 'ChatDebugViewTableHeader',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellType',
      type: VirtualDomElements.Div,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell',
      type: VirtualDomElements.Div,
    },
    text('Started'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell',
      type: VirtualDomElements.Div,
    },
    text('Ended'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Div,
    },
    text('Duration'),
    {
      childCount: rowNodes.length === 0 ? 1 : rowNodes.length,
      className: 'ChatDebugViewTableBody',
      type: VirtualDomElements.Div,
    },
    ...rowNodes,
    ...(hasSelectedEvent
      ? [
          {
            childCount: 2,
            className: 'ChatDebugViewDetails',
            type: VirtualDomElements.Div,
          },
          {
            childCount: 2,
            className: 'ChatDebugViewDetailsTop',
            type: VirtualDomElements.Div,
          },
          {
            childCount: 1,
            className: 'ChatDebugViewDetailsTitle',
            type: VirtualDomElements.Div,
          },
          text('Details'),
          {
            childCount: 0,
            className: 'ChatDebugViewDetailsClose',
            inputType: 'checkbox',
            name: InputName.CloseDetails,
            onChange: DomEventListenerFunctions.HandleSimpleInput,
            type: VirtualDomElements.Input,
            value: 'close',
          },
          {
            childCount: selectedEventNodes.length,
            className: 'ChatDebugViewDetailsBody',
            type: VirtualDomElements.Div,
          },
          ...selectedEventNodes,
        ]
      : []),
  ]
}

export const getChatDebugViewDom = (
  errorMessage: string,
  filterValue: string,
  showEventStreamFinishedEvents: boolean,
  showInputEvents: boolean,
  showResponsePartEvents: boolean,
  useDevtoolsLayout: boolean,
  selectedEventIndex: number | null,
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
  const hasFilterValue = trimmedFilterValue.length > 0
  const noFilteredEventsMessage = `no events found matching ${trimmedFilterValue}`
  const eventCountText = events.length === 0 && hasFilterValue ? noFilteredEventsMessage : `${events.length} event${events.length === 1 ? '' : 's'}`
  const emptyMessage = events.length === 0 && hasFilterValue ? noFilteredEventsMessage : 'No events'

  const safeSelectedEventIndex =
    selectedEventIndex === null || selectedEventIndex < 0 || selectedEventIndex >= events.length ? null : selectedEventIndex

  const contentNodes = useDevtoolsLayout
    ? getDevtoolsDom(eventNodes, events, safeSelectedEventIndex)
    : getLegacyEventsDom(errorMessage, emptyMessage, eventNodes)

  return [
    {
      childCount: 3,
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
      className: 'InputBox',
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
      inputType: 'checkbox',
      name: InputName.UseDevtoolsLayout,
      onChange: DomEventListenerFunctions.HandleInput,
      type: VirtualDomElements.Input,
    },
    text('Use devtools layout'),
    {
      childCount: 1,
      className: 'ChatDebugViewEventCount',
      type: VirtualDomElements.Div,
    },
    text(eventCountText),
    ...contentNodes,
  ]
}
