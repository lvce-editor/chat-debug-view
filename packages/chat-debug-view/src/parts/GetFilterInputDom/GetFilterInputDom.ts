import { mergeClassNames, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugViewFilterInput, ChatDebugViewFilterInputDevtools, InputBox } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

export const getFilterInputDom = (filterValue: string, useDevtoolsLayout: boolean): VirtualDomNode => {
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
