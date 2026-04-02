import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewSash, ChatDebugViewSashLine } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getSashNodesDom = (hasSelectedEvent: boolean): readonly VirtualDomNode[] => {
  if (!hasSelectedEvent) {
    return []
  }

  return [
    {
      childCount: 1,
      className: ChatDebugViewSash,
      onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ChatDebugViewSashLine,
      type: VirtualDomElements.Div,
    },
  ]
}
