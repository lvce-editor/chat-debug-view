import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { TableScrollBar, TableScrollBarThumb } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getTableScrollBarDom = (visible: boolean): readonly VirtualDomNode[] => {
  if (!visible) {
    return []
  }
  return [
    {
      childCount: 1,
      className: TableScrollBar,
      onPointerDown: DomEventListenerFunctions.HandleTableScrollBarPointerDown,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: TableScrollBarThumb,
      type: VirtualDomElements.Div,
    },
  ]
}
