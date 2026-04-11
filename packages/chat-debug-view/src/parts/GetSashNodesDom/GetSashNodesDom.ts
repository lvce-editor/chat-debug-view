import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { Sash, ChatDebugViewSashLine } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const sashNodesDom: readonly VirtualDomNode[] = [
  {
    childCount: 1,
    className: Sash,
    onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
    type: VirtualDomElements.Button,
  },
  {
    childCount: 0,
    className: ChatDebugViewSashLine,
    type: VirtualDomElements.Div,
  },
]

export const getSashNodesDom = (hasSelectedEvent: boolean): readonly VirtualDomNode[] => {
  if (!hasSelectedEvent) {
    return []
  }

  return sashNodesDom
}
