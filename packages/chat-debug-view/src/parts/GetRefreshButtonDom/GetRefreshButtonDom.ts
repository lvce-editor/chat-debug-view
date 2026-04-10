import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugViewRefreshButton } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

const refreshButtonDom = [
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
] as const

export const getRefreshButtonDom = (): readonly VirtualDomNode[] => {
  return refreshButtonDom
}
