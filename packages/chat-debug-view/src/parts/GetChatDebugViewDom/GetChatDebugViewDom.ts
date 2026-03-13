import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import * as InputName from '../InputName/InputName.ts'

export const getChatDebugViewDom = (
  errorMessage: string,
  filterValue: string,
  showEventStreamFinishedEvents: boolean,
  showFullOutput: boolean,
  showInputEvents: boolean,
  showResponsePartEvents: boolean,
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

  const eventNodes = events.flatMap((event) => getEventNode(event, showFullOutput))
  const trimmedFilterValue = filterValue.trim()
  const hasFilterValue = trimmedFilterValue.length > 0
  const noFilteredEventsMessage = `no events found matching ${trimmedFilterValue}`
  const eventCountText = events.length === 0 && hasFilterValue ? noFilteredEventsMessage : `${events.length} event${events.length === 1 ? '' : 's'}`
  const emptyMessage = events.length === 0 && hasFilterValue ? noFilteredEventsMessage : 'No events'
  return [
    {
      childCount: 3,
      className: 'ChatDebugView',
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
      checked: showFullOutput,
      childCount: 0,
      inputType: 'checkbox',
      name: InputName.ShowFullOutput,
      onChange: DomEventListenerFunctions.HandleInput,
      type: VirtualDomElements.Input,
    },
    text('Show full output'),
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
      childCount: 1,
      className: 'ChatDebugViewEventCount',
      type: VirtualDomElements.Div,
    },
    text(eventCountText),
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
