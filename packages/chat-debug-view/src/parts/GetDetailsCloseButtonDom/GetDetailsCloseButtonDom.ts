import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugViewDetailsClose } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

const detailsCloseButtonDom = [
  {
    'aria-label': ChatDebugStrings.closeDetails(),
    childCount: 1,
    className: ChatDebugViewDetailsClose,
    name: InputName.CloseDetails,
    onChange: DomEventListenerFunctions.HandleCloseDetails,
    onClick: DomEventListenerFunctions.HandleCloseDetails,
    type: VirtualDomElements.Button,
    value: 'close',
  },
  {
    childCount: 0,
    className: 'MaskIcon MaskIconClose',
    type: VirtualDomElements.Div,
  },
] as const

export const getDetailsCloseButtonDom = (): readonly VirtualDomNode[] => {
  return detailsCloseButtonDom
}
