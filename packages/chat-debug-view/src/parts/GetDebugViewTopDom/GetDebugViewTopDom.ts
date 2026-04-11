import { mergeClassNames, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import {
  ChatDebugViewFilterInput,
  ChatDebugViewFilterInputDevtools,
  ChatDebugViewTop,
  ChatDebugViewTopDevtools,
  InputBox,
} from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetRefreshButtonDom from '../GetRefreshButtonDom/GetRefreshButtonDom.ts'
import * as InputName from '../InputName/InputName.ts'

const getFilterInputDom = (filterValue: string, useDevtoolsLayout: boolean): VirtualDomNode => {
  return {
    autocomplete: 'off',
    childCount: 0,
    className: useDevtoolsLayout
      ? mergeClassNames(InputBox, ChatDebugViewFilterInput, ChatDebugViewFilterInputDevtools)
      : mergeClassNames(InputBox, ChatDebugViewFilterInput),
    inputType: 'search',
    name: InputName.Filter,
    onInput: DomEventListenerFunctions.HandleFilterInput,
    placeholder: ChatDebugStrings.filterEvents(),
    type: VirtualDomElements.Input,
    value: filterValue,
  }
}

export const getDebugViewTopDom = (
  filterValue: string,
  useDevtoolsLayout: boolean,
  quickFilterNodes: readonly VirtualDomNode[],
): readonly VirtualDomNode[] => {
  const refreshButtonDom = GetRefreshButtonDom.getRefreshButtonDom()
  if (useDevtoolsLayout) {
    return [
      {
        childCount: 2 + (quickFilterNodes.length > 0 ? 1 : 0),
        className: mergeClassNames(ChatDebugViewTop, ChatDebugViewTopDevtools),
        onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
        type: VirtualDomElements.Search,
      },
      getFilterInputDom(filterValue, true),
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
    getFilterInputDom(filterValue, false),
    ...refreshButtonDom,
  ]
}
