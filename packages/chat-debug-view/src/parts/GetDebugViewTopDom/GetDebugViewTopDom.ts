import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import {
  ChatDebugViewFilterInput,
  ChatDebugViewFilterInputDevtools,
  ChatDebugViewTop,
  ChatDebugViewTopDevtools,
  InputBox,
  joinClassNames,
} from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

export const getDebugViewTopDom = (
  filterValue: string,
  useDevtoolsLayout: boolean,
  quickFilterNodes: readonly VirtualDomNode[],
): readonly VirtualDomNode[] => {
  if (useDevtoolsLayout) {
    return [
      {
        childCount: 1 + (quickFilterNodes.length > 0 ? 1 : 0),
        className: joinClassNames(ChatDebugViewTop, ChatDebugViewTopDevtools),
        type: VirtualDomElements.Search,
      },
      {
        autocomplete: 'off',
        childCount: 0,
        className: joinClassNames(InputBox, ChatDebugViewFilterInput, ChatDebugViewFilterInputDevtools),
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
      childCount: 1,
      className: ChatDebugViewTop,
      type: VirtualDomElements.Search,
    },
    {
      autocomplete: 'off',
      childCount: 0,
      className: joinClassNames(InputBox, ChatDebugViewFilterInput),
      inputType: 'search',
      name: InputName.Filter,
      onInput: DomEventListenerFunctions.HandleFilterInput,
      placeholder: 'Filter events',
      type: VirtualDomElements.Input,
      value: filterValue,
    },
  ]
}
