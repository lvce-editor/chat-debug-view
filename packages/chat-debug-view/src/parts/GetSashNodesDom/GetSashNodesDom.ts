import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { Sash } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const sashNodesDom: readonly VirtualDomNode[] = [
  {
    childCount: 0,
    className: Sash,
    onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
    type: VirtualDomElements.Button,
  },
]

export const getSashNodesDom = (hasSelectedEvent: boolean): readonly VirtualDomNode[] => {
  if (!hasSelectedEvent) {
    return []
  }

  return sashNodesDom
}
