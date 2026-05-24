import { type VirtualDomNode, ClassNames, VirtualDomElements, mergeClassNames } from '@lvce-editor/virtual-dom-worker'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

const refreshButtonDom = [
  {
    'aria-label': ChatDebugStrings.refreshEvents(),
    childCount: 1,
    className: mergeClassNames('IconButton'),
    name: InputName.Refresh,
    onClick: DomEventListenerFunctions.HandleClickRefresh,
    type: VirtualDomElements.Button,
    value: InputName.Refresh,
  },
  {
    childCount: 0,
    className: mergeClassNames(ClassNames.MaskIcon, 'MaskIconRefresh'),
    type: VirtualDomElements.Div,
  },
] as const

export const getRefreshButtonDom = (): readonly VirtualDomNode[] => {
  return refreshButtonDom
}
