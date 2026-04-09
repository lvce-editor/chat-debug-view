import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import {
  ChatDebugViewFilterInput,
  ChatDebugViewFilterInputDevtools,
  ChatDebugViewRefreshButton,
  ChatDebugViewTop,
  ChatDebugViewTopDevtools,
  InputBox,
  joinClassNames,
} from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

const getRefreshButtonDom = (): readonly VirtualDomNode[] => {
  return [
    {
      'aria-label': ChatDebugStrings.refreshEvents(),
      childCount: 1,
      className: ChatDebugViewRefreshButton,
      name: InputName.Refresh,
      onClick: DomEventListenerFunctions.HandleClickRefresh,
      type: VirtualDomElements.Button,
      value: InputName.Refresh,
    },
    text(ChatDebugStrings.refresh()),
  ]
}

export const getDebugViewTopDom = (
  filterValue: string,
  useDevtoolsLayout: boolean,
  quickFilterNodes: readonly VirtualDomNode[],
): readonly VirtualDomNode[] => {
  const refreshButtonDom = getRefreshButtonDom()
  if (useDevtoolsLayout) {
    return [
      {
        childCount: 2 + (quickFilterNodes.length > 0 ? 1 : 0),
        className: joinClassNames(ChatDebugViewTop, ChatDebugViewTopDevtools),
        onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
        type: VirtualDomElements.Search,
      },
      {
        autocomplete: 'off',
        childCount: 0,
        className: joinClassNames(InputBox, ChatDebugViewFilterInput, ChatDebugViewFilterInputDevtools),
        inputType: 'search',
        name: InputName.Filter,
        onInput: DomEventListenerFunctions.HandleFilterInput,
        placeholder: ChatDebugStrings.filterEvents(),
        type: VirtualDomElements.Input,
        value: filterValue,
      },
      ...quickFilterNodes,
      ...refreshButtonDom,
    ]
  }

  return [
    {
      childCount: 2,
      className: ChatDebugViewTop,
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.Search,
    },
    {
      autocomplete: 'off',
      childCount: 0,
      className: joinClassNames(InputBox, ChatDebugViewFilterInput),
      inputType: 'search',
      name: InputName.Filter,
      onInput: DomEventListenerFunctions.HandleFilterInput,
      placeholder: ChatDebugStrings.filterEvents(),
      type: VirtualDomElements.Input,
      value: filterValue,
    },
    ...refreshButtonDom,
  ]
}
