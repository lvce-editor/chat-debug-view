import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

const getToggleNodes = (
  showEventStreamFinishedEvents: boolean,
  showInputEvents: boolean,
  showResponsePartEvents: boolean,
  useDevtoolsLayout: boolean,
): readonly VirtualDomNode[] => {
  return [
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
  ]
}

export const getDebugViewTopDom = (
  filterValue: string,
  showEventStreamFinishedEvents: boolean,
  showInputEvents: boolean,
  showResponsePartEvents: boolean,
  useDevtoolsLayout: boolean,
  quickFilterNodes: readonly VirtualDomNode[],
): readonly VirtualDomNode[] => {
  const toggleNodes = getToggleNodes(showEventStreamFinishedEvents, showInputEvents, showResponsePartEvents, useDevtoolsLayout)
  if (useDevtoolsLayout) {
    return [
      ...toggleNodes,
      {
        childCount: 1 + (quickFilterNodes.length > 0 ? 1 : 0),
        className: 'ChatDebugViewTop ChatDebugViewTop--devtools',
        type: VirtualDomElements.Search,
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
      ...quickFilterNodes,
    ]
  }

  return [
    {
      childCount: 2,
      className: 'ChatDebugViewTop',
      type: VirtualDomElements.Search,
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
    ...toggleNodes,
  ]
}
